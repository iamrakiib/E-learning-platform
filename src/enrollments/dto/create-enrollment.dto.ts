import { IsNumber, IsNotEmpty } from 'class-validator';

export class CreateEnrollmentDto {
  @IsNumber()
  @IsNotEmpty()
  courseId: number;
}
