import { IsString, IsOptional, IsNumber, IsEnum, MaxLength } from 'class-validator';

export enum LLMProvider {
  OPENAI = 'openai',
  ANTHROPIC = 'anthropic',
  GOOGLE = 'google',
}

export class SendMessageDto {
  @IsString()
  @MaxLength(4000)
  message: string;

  @IsOptional()
  @IsString()
  sessionId?: string;

  @IsOptional()
  @IsNumber()
  courseId?: number;

  @IsOptional()
  @IsNumber()
  lessonId?: number;

  @IsOptional()
  @IsEnum(LLMProvider)
  provider?: LLMProvider;
}

export class CreateSessionDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  title?: string;

  @IsOptional()
  @IsNumber()
  courseId?: number;

  @IsOptional()
  @IsString()
  systemPrompt?: string;
}

export class IndexCourseDto {
  @IsNumber()
  courseId: number;

  @IsOptional()
  @IsNumber()
  chunkSize?: number;

  @IsOptional()
  @IsNumber()
  chunkOverlap?: number;
}
