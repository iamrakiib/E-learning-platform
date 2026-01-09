import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  Res,
  Headers,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Request,
  HttpCode,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { VideoStreamService } from './video-stream.service';
import { UpdateProgressDto, UploadVideoDto, TranscodeOptionsDto } from './dto/video-stream.dto';

@Controller('videos')
export class VideoStreamController {
  constructor(private readonly videoStreamService: VideoStreamService) {}

  /**
   * Get streaming status
   */
  @Get('status')
  getStatus() {
    return this.videoStreamService.getStreamingStatus();
  }

  /**
   * Upload a video (Admin/Instructor only)
   */
  @Post('upload')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'instructor')
  @UseInterceptors(FileInterceptor('video'))
  async uploadVideo(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: UploadVideoDto,
  ) {
    if (!file) {
      throw new BadRequestException('No video file provided');
    }

    return this.videoStreamService.uploadVideo(
      file,
      dto.lessonId ? parseInt(dto.lessonId as any) : undefined,
      dto.title,
    );
  }

  /**
   * Get video info
   */
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  getVideo(@Param('id') id: string) {
    return this.videoStreamService.getVideo(id);
  }

  /**
   * Get video by lesson
   */
  @Get('lesson/:lessonId')
  @UseGuards(JwtAuthGuard)
  getVideoByLesson(@Param('lessonId') lessonId: string) {
    return this.videoStreamService.getVideoByLesson(parseInt(lessonId));
  }

  /**
   * Stream video (supports range requests)
   */
  @Get(':id/stream')
  async streamVideo(
    @Param('id') id: string,
    @Headers('range') range: string,
    @Query('quality') quality: string,
    @Res() res: Response,
  ) {
    return this.videoStreamService.streamVideo(id, res, range, quality);
  }

  /**
   * Stream HLS playlist/segment
   */
  @Get(':id/hls/:filename')
  async streamHLS(
    @Param('id') id: string,
    @Param('filename') filename: string,
    @Res() res: Response,
  ) {
    return this.videoStreamService.streamHLS(id, filename, res);
  }

  /**
   * Get video thumbnail
   */
  @Get(':id/thumbnail/:index?')
  async getThumbnail(
    @Param('id') id: string,
    @Param('index') index: string = '0',
    @Res() res: Response,
  ) {
    return this.videoStreamService.getThumbnail(id, parseInt(index), res);
  }

  /**
   * Update video progress
   */
  @Put(':id/progress')
  @UseGuards(JwtAuthGuard)
  updateProgress(
    @Request() req,
    @Param('id') id: string,
    @Body() dto: UpdateProgressDto,
  ) {
    return this.videoStreamService.updateProgress(req.user.id, id, dto);
  }

  /**
   * Get video progress
   */
  @Get(':id/progress')
  @UseGuards(JwtAuthGuard)
  getProgress(@Request() req, @Param('id') id: string) {
    return this.videoStreamService.getProgress(req.user.id, id);
  }

  /**
   * Reprocess video (Admin only)
   */
  @Post(':id/process')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  processVideo(@Param('id') id: string) {
    return this.videoStreamService.processVideo(id);
  }

  /**
   * Delete video (Admin only)
   */
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteVideo(@Param('id') id: string) {
    return this.videoStreamService.deleteVideo(id);
  }
}
