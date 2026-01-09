import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../users/user.entity';

export enum NotificationType {
  ENROLLMENT = 'enrollment',
  COURSE_UPDATE = 'course_update',
  PROGRESS_MILESTONE = 'progress_milestone',
  REVIEW = 'review',
  SYSTEM = 'system',
}

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @Column({ type: 'enum', enum: NotificationType })
  type: NotificationType;
  
  @Column()
  title: string;

  @Column('text')
  message: string;

  @Column({ default: false })
  isRead: boolean;

  @CreateDateColumn()
  createdAt: Date;
}

