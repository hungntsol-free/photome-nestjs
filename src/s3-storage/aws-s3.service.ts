import {
  S3Client,
  S3ClientConfig,
  PutObjectCommand,
  DeleteObjectCommand,
  PutObjectCommandOutput,
} from '@aws-sdk/client-s3';
import { Injectable, Scope } from '@nestjs/common';
import { BlobStorage } from './contracts/blob-storage.service';
import { BlobFile } from './model/BlobFile';
import { PutBlobResult } from './model/ResultModel';
import { ConfigService } from '@nestjs/config';

@Injectable({
  scope: Scope.DEFAULT,
})
export class AWSS3StorageService implements BlobStorage {
  s3Client: S3Client;

  constructor(private envConfig: ConfigService) {
    const s3ClientConfig: S3ClientConfig = {
      credentials: {
        secretAccessKey: envConfig.get('AWSS3_ACCESS_KEY'),
        accessKeyId: envConfig.get('AWSS3_SECRET_KEY'),
      },
    };

    this.s3Client = new S3Client(s3ClientConfig);
  }

  async delete(
    bucket: string,
    key: string,
    versionId: string,
  ): Promise<boolean> {
    const deleteCommand = new DeleteObjectCommand({
      Bucket: bucket,
      Key: key,
      VersionId: versionId,
    });

    const deleteObjectOutput = await this.s3Client.send(deleteCommand);

    if (deleteObjectOutput.DeleteMarker) {
      return true;
    }

    return false;
  }

  async put(blobFile: BlobFile): Promise<PutBlobResult> {
    const putCommand = new PutObjectCommand({
      Bucket: blobFile.bucket,
      Key: blobFile.key,
      Body: blobFile.content,
      ContentType: blobFile.contentType,
    });

    const putObjectOutput = await this.s3Client.send(putCommand);

    const result: PutBlobResult = {
      acknowledged: true,
      url: this.combineS3Url(blobFile, putObjectOutput),
    };

    return result;
  }

  private combineS3Url(
    object: BlobFile,
    output: PutObjectCommandOutput,
  ): string {
    return `https://domain/${object.bucket}/${object.key}?versionId=${output.VersionId}`;
  }
}
