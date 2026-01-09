import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Lesson } from '../courses/lesson.entity';

@Entity()
export class LessonProgress {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Lesson)
  lesson: Lesson;

  @Column({ default: false })
  completed: boolean;

  @Column({ default: 0 })
  timeSpent: number; // in minutes

  @CreateDateColumn()
  lastAccessedAt: Date;
}
