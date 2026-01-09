import { IsString, IsNumber, IsOptional, Min, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateLessonDto {
  @ApiProperty({
    description: 'Lesson title',
    example: 'Introduction to JavaScript Variables',
    maxLength: 200,
  })
  @IsString()
  @MaxLength(200)
  title: string;

  @ApiProperty({
    description: 'Lesson content (text, markdown, or HTML)',
    example: 'In this lesson, we will learn about variables in JavaScript...',
  })
  @IsString()
  content: string;

  @ApiProperty({
    description: 'Lesson order/sequence number',
    example: 1,
    minimum: 1,
  })
  @IsNumber()
  @Min(1)
  order: number;

  @ApiPropertyOptional({
    description: 'Video URL (if video has been uploaded)',
    example: 'http://localhost:3000/uploads/videos/video-123.mp4',
  })
  @IsOptional()
  @IsString()
  videoUrl?: string;

  @ApiPropertyOptional({
    description: 'Lesson duration in minutes',
    example: 15,
    minimum: 0,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  duration?: number;
}
