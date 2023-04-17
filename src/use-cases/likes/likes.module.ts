import { Module } from '@nestjs/common';
import { LikeController } from './likes.controller';
import { LikeService } from './likes.service';

@Module({
  controllers: [LikeController],
  providers: [LikeService],
})
export class LikeModule {}
