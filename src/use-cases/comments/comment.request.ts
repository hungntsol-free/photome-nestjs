import { IsNotEmpty } from 'class-validator';

export class PostCommentRequest {
  @IsNotEmpty()
  id_User: string;

  @IsNotEmpty()
  id_Newfeed: string;

  @IsNotEmpty()
  comment: string;
}

export class DeleteCommentRequest {
  @IsNotEmpty()
  id_User: string;

  @IsNotEmpty()
  id_Newfeed: string;

  @IsNotEmpty()
  id_Comment: string;
}
