import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { VideoAsset, VideoQuality, VideoStatus } from './entities/video-asset.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { spawn } from 'child_process';
import { join, dirname } from 'path';
import { existsSync, mkdirSync, unlinkSync, readdirSync } from 'fs';
import { promisify } from 'util';
import { exec } from 'child_process';

const execAsync = promisify(exec);

export interface TranscodeResult {
  hlsPlaylistPath: string;
  hlsVariants: Array<{
    quality: VideoQuality;
    path: string;
    bandwidth: number;
    resolution: string;
  }>;
  thumbnails: Array<{
    time: number;
    path: string;
  }>;
  thumbnailPath: string;
  duration: number;
  width: number;
  height: number;
  metadata: any;
}

@Injectable()
export class TranscodingService {
  private readonly logger = new Logger(TranscodingService.name);
  private readonly ffmpegPath: string;
  private readonly ffprobePath: string;
  private readonly outputDir: string;

  // Quality presets for HLS
  private readonly qualityPresets = {
    [VideoQuality.HD_1080P]: {
      resolution: '1920x1080',
      bitrate: '5000k',
      audioBitrate: '192k',
      bandwidth: 5500000,
    },
    [VideoQuality.HD_720P]: {
      resolution: '1280x720',
      bitrate: '2800k',
      audioBitrate: '128k',
      bandwidth: 3000000,
    },
    [VideoQuality.SD_480P]: {
      resolution: '854x480',
      bitrate: '1400k',
      audioBitrate: '128k',
      bandwidth: 1600000,
    },
    [VideoQuality.SD_360P]: {
      resolution: '640x360',
      bitrate: '800k',
      audioBitrate: '96k',
      bandwidth: 900000,
    },
  };

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(VideoAsset)
    private readonly videoRepository: Repository<VideoAsset>,
  ) {
    this.ffmpegPath = this.configService.get<string>('FFMPEG_PATH', 'ffmpeg');
    this.ffprobePath = this.configService.get<string>('FFPROBE_PATH', 'ffprobe');
    this.outputDir = join(process.cwd(), 'uploads', 'videos', 'hls');

    // Ensure output directories exist
    this.ensureDirectories();
  }

  private ensureDirectories(): void {
    const dirs = [
      join(process.cwd(), 'uploads', 'videos', 'raw'),
      join(process.cwd(), 'uploads', 'videos', 'hls'),
      join(process.cwd(), 'uploads', 'videos', 'thumbnails'),
    ];

    dirs.forEach((dir) => {
      if (!existsSync(dir)) {
        mkdirSync(dir, { recursive: true });
      }
    });
  }

  /**
   * Get video metadata using ffprobe
   */
  async getVideoMetadata(inputPath: string): Promise<any> {
    try {
      const { stdout } = await execAsync(
        `"${this.ffprobePath}" -v quiet -print_format json -show_format -show_streams "${inputPath}"`,
      );
      return JSON.parse(stdout);
    } catch (error) {
      this.logger.error(`Failed to get video metadata: ${error.message}`);
      throw error;
    }
  }

  /**
   * Transcode video to HLS format with multiple qualities
   */
  async transcodeToHLS(
    videoAsset: VideoAsset,
    qualities: VideoQuality[] = [
      VideoQuality.HD_1080P,
      VideoQuality.HD_720P,
      VideoQuality.SD_480P,
    ],
  ): Promise<TranscodeResult> {
    const inputPath = videoAsset.storagePath;
    const videoId = videoAsset.id;
    const hlsDir = join(this.outputDir, videoId);

    // Create output directory
    if (!existsSync(hlsDir)) {
      mkdirSync(hlsDir, { recursive: true });
    }

    // Update status
    videoAsset.status = VideoStatus.PROCESSING;
    await this.videoRepository.save(videoAsset);

    try {
      // Get video metadata
      const metadata = await this.getVideoMetadata(inputPath);
      const videoStream = metadata.streams.find((s: any) => s.codec_type === 'video');
      const audioStream = metadata.streams.find((s: any) => s.codec_type === 'audio');

      const duration = parseFloat(metadata.format.duration);
      const sourceWidth = videoStream?.width || 1920;
      const sourceHeight = videoStream?.height || 1080;

      // Filter qualities based on source resolution
      const applicableQualities = qualities.filter((q) => {
        const preset = this.qualityPresets[q];
        if (!preset) return false;
        const [w, h] = preset.resolution.split('x').map(Number);
        return h <= sourceHeight;
      });

      if (applicableQualities.length === 0) {
        applicableQualities.push(VideoQuality.SD_480P);
      }

      const hlsVariants: TranscodeResult['hlsVariants'] = [];
      const startTime = Date.now();

      // Transcode each quality
      for (const quality of applicableQualities) {
        const preset = this.qualityPresets[quality];
        const outputPath = join(hlsDir, `${quality}.m3u8`);
        const segmentPath = join(hlsDir, `${quality}_%03d.ts`);

        await this.runFFmpeg([
          '-i', inputPath,
          '-vf', `scale=${preset.resolution}:force_original_aspect_ratio=decrease,pad=${preset.resolution}:(ow-iw)/2:(oh-ih)/2`,
          '-c:v', 'libx264',
          '-preset', 'medium',
          '-crf', '23',
          '-b:v', preset.bitrate,
          '-maxrate', preset.bitrate,
          '-bufsize', `${parseInt(preset.bitrate) * 2}k`,
          '-c:a', 'aac',
          '-b:a', preset.audioBitrate,
          '-hls_time', '10',
          '-hls_list_size', '0',
          '-hls_segment_filename', segmentPath,
          '-f', 'hls',
          outputPath,
        ]);

        hlsVariants.push({
          quality,
          path: outputPath,
          bandwidth: preset.bandwidth,
          resolution: preset.resolution,
        });

        this.logger.log(`Transcoded ${quality} for video ${videoId}`);
      }

      // Generate master playlist
      const masterPlaylistPath = join(hlsDir, 'master.m3u8');
      const masterPlaylist = this.generateMasterPlaylist(hlsVariants, videoId);
      require('fs').writeFileSync(masterPlaylistPath, masterPlaylist);

      // Generate thumbnails
      const thumbnails = await this.generateThumbnails(inputPath, videoId, duration);

      const processingTime = (Date.now() - startTime) / 1000;

      return {
        hlsPlaylistPath: masterPlaylistPath,
        hlsVariants,
        thumbnails,
        thumbnailPath: thumbnails[0]?.path || '',
        duration: Math.round(duration),
        width: sourceWidth,
        height: sourceHeight,
        metadata: {
          codec: videoStream?.codec_name,
          bitrate: parseInt(metadata.format.bit_rate) / 1000,
          framerate: eval(videoStream?.r_frame_rate) || 30,
          audioCodec: audioStream?.codec_name,
          audioBitrate: audioStream ? parseInt(audioStream.bit_rate) / 1000 : undefined,
          processingTime,
        },
      };
    } catch (error) {
      videoAsset.status = VideoStatus.FAILED;
      videoAsset.errorMessage = error.message;
      await this.videoRepository.save(videoAsset);
      throw error;
    }
  }

  /**
   * Generate master HLS playlist
   */
  private generateMasterPlaylist(
    variants: TranscodeResult['hlsVariants'],
    videoId: string,
  ): string {
    let playlist = '#EXTM3U\n#EXT-X-VERSION:3\n';

    for (const variant of variants) {
      playlist += `#EXT-X-STREAM-INF:BANDWIDTH=${variant.bandwidth},RESOLUTION=${variant.resolution}\n`;
      playlist += `${variant.quality}.m3u8\n`;
    }

    return playlist;
  }

  /**
   * Generate video thumbnails
   */
  async generateThumbnails(
    inputPath: string,
    videoId: string,
    duration: number,
  ): Promise<TranscodeResult['thumbnails']> {
    const thumbnailDir = join(process.cwd(), 'uploads', 'videos', 'thumbnails', videoId);
    
    if (!existsSync(thumbnailDir)) {
      mkdirSync(thumbnailDir, { recursive: true });
    }

    const thumbnails: TranscodeResult['thumbnails'] = [];
    const times = [0, Math.floor(duration / 4), Math.floor(duration / 2), Math.floor(duration * 3 / 4)];

    for (const time of times) {
      const outputPath = join(thumbnailDir, `thumb_${time}.jpg`);
      
      try {
        await this.runFFmpeg([
          '-ss', time.toString(),
          '-i', inputPath,
          '-vframes', '1',
          '-q:v', '2',
          '-vf', 'scale=320:-1',
          outputPath,
        ]);

        thumbnails.push({ time, path: outputPath });
      } catch (error) {
        this.logger.warn(`Failed to generate thumbnail at ${time}s: ${error.message}`);
      }
    }

    return thumbnails;
  }

  /**
   * Run FFmpeg command
   */
  private runFFmpeg(args: string[]): Promise<void> {
    return new Promise((resolve, reject) => {
      const process = spawn(this.ffmpegPath, args);
      let stderr = '';

      process.stderr.on('data', (data) => {
        stderr += data.toString();
      });

      process.on('close', (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject(new Error(`FFmpeg exited with code ${code}: ${stderr}`));
        }
      });

      process.on('error', (error) => {
        reject(error);
      });
    });
  }

  /**
   * Check if FFmpeg is available
   */
  async isFFmpegAvailable(): Promise<boolean> {
    try {
      await execAsync(`"${this.ffmpegPath}" -version`);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Clean up transcoding files
   */
  async cleanupFiles(videoId: string): Promise<void> {
    const hlsDir = join(this.outputDir, videoId);
    const thumbnailDir = join(process.cwd(), 'uploads', 'videos', 'thumbnails', videoId);

    try {
      if (existsSync(hlsDir)) {
        const files = readdirSync(hlsDir);
        files.forEach((file) => unlinkSync(join(hlsDir, file)));
        require('fs').rmdirSync(hlsDir);
      }

      if (existsSync(thumbnailDir)) {
        const files = readdirSync(thumbnailDir);
        files.forEach((file) => unlinkSync(join(thumbnailDir, file)));
        require('fs').rmdirSync(thumbnailDir);
      }
    } catch (error) {
      this.logger.error(`Failed to cleanup files for ${videoId}: ${error.message}`);
    }
  }
}
