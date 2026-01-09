import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { Course } from '../courses/course.entity';

@Entity()
export class Lesson {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Course, course => course.lessons)
  course: Course;

  @Column()
  title: string;

  @Column('text')
  content: string;

  @Column()
  order: number;

  @Column({ nullable: true })
  videoUrl: string;

  @Column({ default: 0 })
  duration: number; // in minutes

  @CreateDateColumn()
  createdAt: Date;
}
