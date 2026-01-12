import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PusherService } from './pusher.service';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [PusherService],
  exports: [PusherService],
})
export class PusherModule {}
