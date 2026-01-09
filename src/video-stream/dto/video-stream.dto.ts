import { IsString, IsOptional, IsNumber, IsBoolean, Min, Max } from 'class-validator';

export class UploadVideoDto {
  @IsOptional()
  @IsNumber()
  lessonId?: number;

  @IsOptional()
  @IsString()
  title?: string;
}

export class UpdateProgressDto {
  @IsNumber()
  @Min(0)
  currentTime: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  watchedDuration?: number;

  @IsOptional()
  @IsBoolean()
  completed?: boolean;

  @IsOptional()
  @IsNumber()
  @Min(0.25)
  @Max(2)
  playbackSpeed?: number;

  @IsOptional()
  @IsString()
  preferredQuality?: string;
}

export class TranscodeOptionsDto {
  @IsOptional()
  @IsBoolean()
  generateHls?: boolean;

  @IsOptional()
  @IsBoolean()
  generateThumbnails?: boolean;

  @IsOptional()
  qualities?: string[];
}
