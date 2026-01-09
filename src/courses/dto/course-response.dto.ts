export class CourseResponseDto {
  id: number;
  title: string;
  description: string;
  instructor: string;
  price: number;
  duration: number;
  isActive: boolean;
  createdAt: Date;
  enrollmentCount?: number;

  constructor(partial: Partial<CourseResponseDto>) {
    Object.assign(this, partial);
  }
}
