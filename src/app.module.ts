import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NestModule } from '@nestjs/common';
import { DbCollectionModule } from '@collections';
import { AppLoggerModule } from '@providers/logger';
import { RequestLoggerMiddleware } from '@middlewares';

import { UserModule } from '@use-cases/users';
import { AccountModule } from '@use-cases/accounts';
import { CommentModule } from '@use-cases/comments';
import { FollowModule } from '@use-cases/follows';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    AppLoggerModule.forRoot(),
    DbCollectionModule,
    UserModule,
    AccountModule,
    CommentModule,
    FollowModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}
