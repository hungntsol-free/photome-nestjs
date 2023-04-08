import { DbCollectionModule } from '@collections';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';

@Module({
  imports: [DbCollectionModule],
  exports: [AuthService],
  providers: [AuthService],
})
export class AuthModule {}
