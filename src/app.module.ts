import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NestModule } from '@nestjs/common';
import { DbCollectionModule } from '@collections';
import { AppLoggerModule } from '@providers/logger';
import { RequestLoggerMiddleware } from '@middlewares';
import { AWSS3StorageModule } from '@s3-storage';

import { UserModule } from '@use-cases/users';
import { AccountModule } from '@use-cases/accounts';
import { CommentModule } from '@use-cases/comments';
import { FollowModule } from '@use-cases/follows';
import { LikeModule } from '@use-cases/likes';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    AppLoggerModule.forRoot(),
    DbCollectionModule,
    UserModule,
    AccountModule,
    CommentModule,
    FollowModule,
    LikeModule,
    AWSS3StorageModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}
