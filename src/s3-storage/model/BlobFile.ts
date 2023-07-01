export interface BlobFile {
  bucket: string;
  name: string;
  key: string;
  content: Buffer;
  length: number;
  contentType: string | undefined;
}
