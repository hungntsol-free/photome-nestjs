import { Module } from '@nestjs/common';
import { AWSS3StorageService } from './aws-s3.service';

@Module({
  providers: [AWSS3StorageService],
  exports: [AWSS3StorageService],
})
export class AWSS3StorageModule {}
