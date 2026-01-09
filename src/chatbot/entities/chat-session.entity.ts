import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/user.entity';
import { Course } from '../../courses/course.entity';
import { ChatMessage } from './chat-message.entity';

@Entity('chat_session')
export class ChatSession {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255, nullable: true })
  title: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'jsonb', nullable: true })
  context: {
    courseId?: number;
    lessonId?: number;
    topic?: string;
    systemPrompt?: string;
  };

  @ManyToOne(() => User, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ nullable: true })
  userId: number;

  @Column({ length: 64, nullable: true })
  clientId: string;

  @ManyToOne(() => Course, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'courseId' })
  course: Course;

  @Column({ nullable: true })
  courseId: number;

  @OneToMany(() => ChatMessage, (message) => message.session)
  messages: ChatMessage[];

  @Column({ default: 0 })
  messageCount: number;

  @Column({ default: 0 })
  totalTokens: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
