import {
  Injectable,
  Logger,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { VideoAsset, VideoStatus, VideoQuality } from './entities/video-asset.entity';
import { VideoProgress } from './entities/video-progress.entity';
import { TranscodingService } from './transcoding.service';
import { UpdateProgressDto } from './dto/video-stream.dto';
import { createReadStream, existsSync, statSync } from 'fs';
import { join } from 'path';
import { Response } from 'express';

@Injectable()
export class VideoStreamService {
  private readonly logger = new Logger(VideoStreamService.name);
  private readonly cdnBaseUrl: string;
  private readonly streamingEnabled: boolean;

  constructor(
    @InjectRepository(VideoAsset)
    private readonly videoRepository: Repository<VideoAsset>,
    @InjectRepository(VideoProgress)
    private readonly progressRepository: Repository<VideoProgress>,
    private readonly transcodingService: TranscodingService,
    private readonly configService: ConfigService,
  ) {
    this.cdnBaseUrl = this.configService.get<string>('CDN_BASE_URL', '');
    this.streamingEnabled = this.configService.get<boolean>('VIDEO_STREAMING_ENABLED', true);
  }

  /**
   * Upload and process a video
   */
  async uploadVideo(
    file: Express.Multer.File,
    lessonId?: number,
    title?: string,
  ): Promise<VideoAsset> {
    const videoAsset = this.videoRepository.create({
      originalFilename: file.originalname,
      storagePath: file.path,
      fileSize: file.size,
      mimeType: file.mimetype,
      lessonId,
      status: VideoStatus.PENDING,
    });

    const savedAsset = await this.videoRepository.save(videoAsset);

    // Start transcoding in background
    this.processVideo(savedAsset.id).catch((error) => {
      this.logger.error(`Background processing failed: ${error.message}`);
    });

    return savedAsset;
  }

  /**
   * Process video (transcode to HLS)
   */
  async processVideo(videoId: string): Promise<VideoAsset> {
    const video = await this.videoRepository.findOne({
      where: { id: videoId },
    });

    if (!video) {
      throw new NotFoundException('Video not found');
    }

    // Check if FFmpeg is available
    const ffmpegAvailable = await this.transcodingService.isFFmpegAvailable();
    
    if (!ffmpegAvailable) {
      this.logger.warn('FFmpeg not available, skipping transcoding');
      video.status = VideoStatus.READY;
      video.hlsPlaylistPath = video.storagePath; // Use original file
      return this.videoRepository.save(video);
    }

    try {
      const result = await this.transcodingService.transcodeToHLS(video);

      video.status = VideoStatus.READY;
      video.hlsPlaylistPath = result.hlsPlaylistPath;
      video.hlsVariants = result.hlsVariants;
      video.thumbnailPath = result.thumbnailPath;
      video.thumbnails = result.thumbnails;
      video.duration = result.duration;
      video.width = result.width;
      video.height = result.height;
      video.metadata = result.metadata;

      // Set CDN URLs if configured
      if (this.cdnBaseUrl) {
        video.cdnUrl = `${this.cdnBaseUrl}/videos/${video.id}/stream`;
        video.cdnHlsUrl = `${this.cdnBaseUrl}/videos/${video.id}/hls/master.m3u8`;
      }

      return this.videoRepository.save(video);
    } catch (error) {
      video.status = VideoStatus.FAILED;
      video.errorMessage = error.message;
      await this.videoRepository.save(video);
      throw error;
    }
  }

  /**
   * Get video by ID
   */
  async getVideo(videoId: string): Promise<VideoAsset> {
    const video = await this.videoRepository.findOne({
      where: { id: videoId },
    });

    if (!video) {
      throw new NotFoundException('Video not found');
    }

    return video;
  }

  /**
   * Get video by lesson ID
   */
  async getVideoByLesson(lessonId: number): Promise<VideoAsset | null> {
    return this.videoRepository.findOne({
      where: { lessonId, status: VideoStatus.READY },
    });
  }

  /**
   * Stream video (supports range requests)
   */
  async streamVideo(
    videoId: string,
    res: Response,
    range?: string,
    quality?: string,
  ): Promise<void> {
    const video = await this.getVideo(videoId);

    if (video.status !== VideoStatus.READY) {
      throw new BadRequestException('Video is not ready for streaming');
    }

    // Determine file path
    let filePath: string;
    
    if (quality && video.hlsVariants) {
      const variant = video.hlsVariants.find((v) => v.quality === quality);
      if (variant) {
        filePath = variant.path;
      } else {
        filePath = video.storagePath;
      }
    } else {
      filePath = video.storagePath;
    }

    if (!existsSync(filePath)) {
      throw new NotFoundException('Video file not found');
    }

    const stat = statSync(filePath);
    const fileSize = stat.size;

    // Increment view count
    await this.videoRepository.increment({ id: videoId }, 'viewCount', 1);

    if (range) {
      // Handle range request for seeking
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunkSize = end - start + 1;

      const stream = createReadStream(filePath, { start, end });

      res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkSize,
        'Content-Type': video.mimeType,
        'Cache-Control': 'public, max-age=31536000',
      });

      stream.pipe(res);
    } else {
      res.writeHead(200, {
        'Content-Length': fileSize,
        'Content-Type': video.mimeType,
        'Accept-Ranges': 'bytes',
        'Cache-Control': 'public, max-age=31536000',
      });

      createReadStream(filePath).pipe(res);
    }
  }

  /**
   * Stream HLS playlist or segment
   */
  async streamHLS(
    videoId: string,
    filename: string,
    res: Response,
  ): Promise<void> {
    const video = await this.getVideo(videoId);

    if (video.status !== VideoStatus.READY) {
      throw new BadRequestException('Video is not ready for streaming');
    }

    const hlsDir = join(process.cwd(), 'uploads', 'videos', 'hls', videoId);
    const filePath = join(hlsDir, filename);

    if (!existsSync(filePath)) {
      throw new NotFoundException('HLS file not found');
    }

    const stat = statSync(filePath);
    const contentType = filename.endsWith('.m3u8')
      ? 'application/vnd.apple.mpegurl'
      : 'video/MP2T';

    res.writeHead(200, {
      'Content-Length': stat.size,
      'Content-Type': contentType,
      'Cache-Control': filename.endsWith('.m3u8')
        ? 'no-cache'
        : 'public, max-age=31536000',
      'Access-Control-Allow-Origin': '*',
    });

    createReadStream(filePath).pipe(res);
  }

  /**
   * Get thumbnail
   */
  async getThumbnail(
    videoId: string,
    index: number,
    res: Response,
  ): Promise<void> {
    const video = await this.getVideo(videoId);

    if (!video.thumbnails || video.thumbnails.length === 0) {
      throw new NotFoundException('No thumbnails available');
    }

    const thumbnail = video.thumbnails[index] || video.thumbnails[0];
    
    if (!existsSync(thumbnail.path)) {
      throw new NotFoundException('Thumbnail file not found');
    }

    const stat = statSync(thumbnail.path);

    res.writeHead(200, {
      'Content-Length': stat.size,
      'Content-Type': 'image/jpeg',
      'Cache-Control': 'public, max-age=31536000',
    });

    createReadStream(thumbnail.path).pipe(res);
  }

  /**
   * Update or create video progress
   */
  async updateProgress(
    userId: number,
    videoId: string,
    dto: UpdateProgressDto,
  ): Promise<VideoProgress> {
    const video = await this.getVideo(videoId);

    let progress = await this.progressRepository.findOne({
      where: { userId, videoId },
    });

    if (!progress) {
      progress = this.progressRepository.create({
        userId,
        videoId,
      });
    }

    progress.currentTime = dto.currentTime;
    
    if (dto.watchedDuration !== undefined) {
      progress.watchedDuration = dto.watchedDuration;
    }

    // Calculate progress percentage
    if (video.duration && video.duration > 0) {
      progress.progressPercent = Math.min(
        100,
        (dto.currentTime / video.duration) * 100,
      );
    }

    // Mark as completed if watched 90% or more
    if (progress.progressPercent >= 90 || dto.completed) {
      progress.completed = true;
    }

    if (dto.playbackSpeed !== undefined) {
      progress.playbackSpeed = dto.playbackSpeed;
    }

    if (dto.preferredQuality !== undefined) {
      progress.preferredQuality = dto.preferredQuality;
    }

    // Add to watch history
    if (!progress.watchHistory) {
      progress.watchHistory = [];
    }
    
    progress.watchHistory.push({
      timestamp: new Date(),
      from: progress.currentTime,
      to: dto.currentTime,
    });

    // Keep only last 100 history entries
    if (progress.watchHistory.length > 100) {
      progress.watchHistory = progress.watchHistory.slice(-100);
    }

    return this.progressRepository.save(progress);
  }

  /**
   * Get video progress for a user
   */
  async getProgress(userId: number, videoId: string): Promise<VideoProgress | null> {
    return this.progressRepository.findOne({
      where: { userId, videoId },
    });
  }

  /**
   * Get all video progress for a user in a course
   */
  async getCourseProgress(
    userId: number,
    courseId: number,
  ): Promise<VideoProgress[]> {
    return this.progressRepository
      .createQueryBuilder('progress')
      .innerJoin('progress.video', 'video')
      .innerJoin('video.lesson', 'lesson')
      .innerJoin('lesson.course', 'course')
      .where('progress.userId = :userId', { userId })
      .andWhere('course.id = :courseId', { courseId })
      .getMany();
  }

  /**
   * Delete a video and its files
   */
  async deleteVideo(videoId: string): Promise<void> {
    const video = await this.getVideo(videoId);

    // Clean up transcoding files
    await this.transcodingService.cleanupFiles(videoId);

    // Delete original file
    if (existsSync(video.storagePath)) {
      require('fs').unlinkSync(video.storagePath);
    }

    await this.videoRepository.remove(video);
  }

  /**
   * Get streaming status
   */
  async getStreamingStatus(): Promise<{
    enabled: boolean;
    ffmpegAvailable: boolean;
    cdnConfigured: boolean;
    totalVideos: number;
    readyVideos: number;
    processingVideos: number;
  }> {
    const ffmpegAvailable = await this.transcodingService.isFFmpegAvailable();

    const [totalVideos, readyVideos, processingVideos] = await Promise.all([
      this.videoRepository.count(),
      this.videoRepository.count({ where: { status: VideoStatus.READY } }),
      this.videoRepository.count({ where: { status: VideoStatus.PROCESSING } }),
    ]);

    return {
      enabled: this.streamingEnabled,
      ffmpegAvailable,
      cdnConfigured: !!this.cdnBaseUrl,
      totalVideos,
      readyVideos,
      processingVideos,
    };
  }
}
