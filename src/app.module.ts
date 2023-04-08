import { MiddlewareConsumer, Module } from '@nestjs/common';
import { DbCollectionModule } from '@collections';
import { AppLoggerModule } from '@providers/logger';
import { NestModule } from '@nestjs/common';
import { RequestLoggerMiddleware } from '@middlewares';
import { UserModule } from '@use-cases/user';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    AppLoggerModule.forRoot(),
    DbCollectionModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}
