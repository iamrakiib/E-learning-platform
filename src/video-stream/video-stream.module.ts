import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { VideoStreamController } from './video-stream.controller';
import { VideoStreamService } from './video-stream.service';
import { TranscodingService } from './transcoding.service';
import { VideoAsset } from './entities/video-asset.entity';
import { VideoProgress } from './entities/video-progress.entity';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { v4 as uuidv4 } from 'uuid';

@Module({
  imports: [
    TypeOrmModule.forFeature([VideoAsset, VideoProgress]),
    MulterModule.register({
      storage: diskStorage({
        destination: (req, file, cb) => {
          cb(null, join(process.cwd(), 'uploads', 'videos', 'raw'));
        },
        filename: (req, file, cb) => {
          const uniqueId = uuidv4();
          const ext = extname(file.originalname);
          cb(null, `${uniqueId}${ext}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        const allowedMimes = [
          'video/mp4',
          'video/webm',
          'video/quicktime',
          'video/x-msvideo',
          'video/x-matroska',
        ];
        if (allowedMimes.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(new Error('Invalid video format'), false);
        }
      },
      limits: {
        fileSize: 5 * 1024 * 1024 * 1024, // 5GB max
      },
    }),
  ],
  controllers: [VideoStreamController],
  providers: [VideoStreamService, TranscodingService],
  exports: [VideoStreamService],
})
export class VideoStreamModule {}
