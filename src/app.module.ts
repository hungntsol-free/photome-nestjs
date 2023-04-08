import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DbCollectionModule } from '@collections';
import { AppLoggerModule } from '@providers/logger';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/photome-dev'),
    AppLoggerModule.forRoot(),
    DbCollectionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
