import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';

@Entity()
@Index(['role']) // Index on role for filtering by role
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: 'student' }) // roles: 'student' | 'instructor' | 'admin'
  role: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: 'approved' }) // 'pending' | 'approved' | 'rejected'
  instructorApprovalStatus: string;

  @Column({ type: 'text', nullable: true })
  instructorRejectionReason: string;

  @Column({ type: 'timestamp', nullable: true })
  instructorApplicationDate: Date;

  @Column({ nullable: true })
  profilePicture: string;

  @Column({ type: 'text', nullable: true })
  bio: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}