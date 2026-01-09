import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  Index,
} from 'typeorm';
import { Lesson } from '../../courses/lesson.entity';

export enum VideoStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  READY = 'ready',
  FAILED = 'failed',
}

export enum VideoQuality {
  ORIGINAL = 'original',
  HD_1080P = '1080p',
  HD_720P = '720p',
  SD_480P = '480p',
  SD_360P = '360p',
}

@Entity('video_asset')
@Index(['lessonId', 'status'])
export class VideoAsset {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  originalFilename: string;

  @Column({ length: 500 })
  storagePath: string;

  @Column({ type: 'bigint' })
  fileSize: number;

  @Column({ length: 50 })
  mimeType: string;

  @Column({ type: 'int', nullable: true })
  duration: number; // in seconds

  @Column({ type: 'int', nullable: true })
  width: number;

  @Column({ type: 'int', nullable: true })
  height: number;

  @Column({
    type: 'enum',
    enum: VideoStatus,
    default: VideoStatus.PENDING,
  })
  status: VideoStatus;

  @Column({ type: 'text', nullable: true })
  errorMessage: string;

  // HLS streaming paths
  @Column({ length: 500, nullable: true })
  hlsPlaylistPath: string;

  @Column({ type: 'jsonb', nullable: true })
  hlsVariants: Array<{
    quality: VideoQuality;
    path: string;
    bandwidth: number;
    resolution: string;
  }>;

  // Thumbnail
  @Column({ length: 500, nullable: true })
  thumbnailPath: string;

  @Column({ type: 'jsonb', nullable: true })
  thumbnails: Array<{
    time: number;
    path: string;
  }>;

  // CDN URLs (for production)
  @Column({ length: 500, nullable: true })
  cdnUrl: string;

  @Column({ length: 500, nullable: true })
  cdnHlsUrl: string;

  // Metadata
  @Column({ type: 'jsonb', nullable: true })
  metadata: {
    codec?: string;
    bitrate?: number;
    framerate?: number;
    audioCodec?: string;
    audioBitrate?: number;
    processingTime?: number;
  };

  @ManyToOne(() => Lesson, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'lessonId' })
  lesson: Lesson;

  @Column({ nullable: true })
  lessonId: number;

  @Column({ default: 0 })
  viewCount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
