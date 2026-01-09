import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, Index } from 'typeorm';
import { Review } from './review.entity';
import { Lesson } from './lesson.entity';
import { User } from '../users/user.entity';

export enum CourseLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
}

export enum CourseCategory {
  PROGRAMMING = 'programming',
  DESIGN = 'design',
  BUSINESS = 'business',
  MARKETING = 'marketing',
  DATA_SCIENCE = 'data_science',
  OTHER = 'other',
}

export enum CourseStatus {
  DRAFT = 'draft',
  PENDING_REVIEW = 'pending_review',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

@Entity()
@Index(['category', 'level']) // Composite index for filtering
@Index(['price']) // Index on price for sorting/filtering
@Index(['enrollmentCount']) // Index for popular courses
@Index(['averageRating']) // Index for rating sorting
@Index(['createdAt']) // Index for newest courses
@Index(['title']) // Index for search
@Index(['status']) // Index for filtering by approval status
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column()
  instructor: string;

  @ManyToOne(() => User, { nullable: true })
  instructorUser: User;

  @Column('decimal', { precision: 5, scale: 2, default: 0 })
  price: number;

  @Column({ default: 0 })
  duration: number;

  @Column({ type: 'enum', enum: CourseLevel, default: CourseLevel.BEGINNER })
  level: CourseLevel;

  @Column({ type: 'enum', enum: CourseCategory, default: CourseCategory.OTHER })
  category: CourseCategory;

  @Column({ nullable: true })
  thumbnail: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'enum', enum: CourseStatus, default: CourseStatus.DRAFT })
  status: CourseStatus;

  @Column({ type: 'text', nullable: true })
  rejectionReason: string;

  @Column({ default: 0 })
  enrollmentCount: number;

  @Column('decimal', { precision: 2, scale: 1, default: 0 })
  averageRating: number;

  @OneToMany(() => Review, review => review.course)
  reviews: Review[];

  @OneToMany(() => Lesson, lesson => lesson.course)
  lessons: Lesson[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}