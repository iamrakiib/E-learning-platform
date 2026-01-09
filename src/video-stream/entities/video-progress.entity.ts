import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  Index,
  Unique,
} from 'typeorm';
import { User } from '../../users/user.entity';
import { VideoAsset } from './video-asset.entity';

@Entity('video_progress')
@Index(['userId', 'videoId'])
@Unique(['userId', 'videoId'])
export class VideoProgress {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: number;

  @ManyToOne(() => VideoAsset, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'videoId' })
  video: VideoAsset;

  @Column()
  videoId: string;

  @Column({ type: 'float', default: 0 })
  currentTime: number; // in seconds

  @Column({ type: 'float', default: 0 })
  watchedDuration: number; // total seconds watched

  @Column({ type: 'float', default: 0 })
  progressPercent: number; // 0-100

  @Column({ default: false })
  completed: boolean;

  @Column({ type: 'jsonb', nullable: true })
  watchHistory: Array<{
    timestamp: Date;
    from: number;
    to: number;
  }>;

  @Column({ type: 'float', default: 1 })
  playbackSpeed: number;

  @Column({ type: 'varchar', length: 10, nullable: true })
  preferredQuality: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
