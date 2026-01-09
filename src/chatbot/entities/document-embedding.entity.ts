import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  Index,
  JoinColumn,
} from 'typeorm';
import { Course } from '../../courses/course.entity';
import { Lesson } from '../../courses/lesson.entity';

export enum DocumentType {
  COURSE_DESCRIPTION = 'course_description',
  LESSON_CONTENT = 'lesson_content',
  TRANSCRIPT = 'transcript',
  PDF = 'pdf',
  FAQ = 'faq',
  CUSTOM = 'custom',
}

@Entity('document_embedding')
@Index(['courseId', 'documentType'])
export class DocumentEmbedding {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'text', nullable: true })
  contentHash: string;

  // Store embedding as array - for production, use pgvector extension
  @Column({ type: 'jsonb' })
  embedding: number[];

  @Column({
    type: 'enum',
    enum: DocumentType,
    default: DocumentType.LESSON_CONTENT,
  })
  documentType: DocumentType;

  @Column({ type: 'jsonb', nullable: true })
  metadata: {
    title?: string;
    chunkIndex?: number;
    totalChunks?: number;
    source?: string;
    pageNumber?: number;
  };

  @ManyToOne(() => Course, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'courseId' })
  course: Course;

  @Column({ nullable: true })
  courseId: number;

  @ManyToOne(() => Lesson, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'lessonId' })
  lesson: Lesson;

  @Column({ nullable: true })
  lessonId: number;

  @CreateDateColumn()
  createdAt: Date;
}
