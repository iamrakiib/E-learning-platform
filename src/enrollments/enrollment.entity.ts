import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Course } from '../courses/course.entity';

@Entity()
export class Enrollment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Course)
  course: Course;

  @Column({ default: 0 })
  progress: number;

  @Column({ default: false })
  completed: boolean;

  @CreateDateColumn()
  enrolledAt: Date;
}