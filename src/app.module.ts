import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DbCollectionModule } from '@collections';
import { AppLoggerModule } from '@providers/logger';
import { NestModule } from '@nestjs/common';
import { RequestLoggerMiddleware } from '@middlewares';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/photome-dev'),
    AppLoggerModule.forRoot(),
    DbCollectionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}
