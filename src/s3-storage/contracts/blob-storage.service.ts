import { BlobFile } from '../model/BlobFile';
import { PutBlobResult } from '../model/ResultModel';

export interface BlobStorage {
  /**
   * Upload a file to storage
   */
  put(blobFile: BlobFile): Promise<PutBlobResult>;

  /**
   * Delete a file in storage.
   */
  delete(
    bucket: string,
    key: string,
    versionId: string | undefined,
  ): Promise<boolean>;
}
