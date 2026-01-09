export class EnrollmentResponseDto {
  id: number;
  progress: number;
  completed: boolean;
  enrolledAt: Date;
  course: {
    id: number;
    title: string;
    description: string;
    instructor: string;
    duration: number;
  };

  constructor(partial: Partial<EnrollmentResponseDto>) {
    Object.assign(this, partial);
  }
}
