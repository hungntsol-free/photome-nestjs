import { IsNotEmpty } from 'class-validator';

export class PostLikeRequest {
  @IsNotEmpty()
  id_User: string;

  @IsNotEmpty()
  id_Newfeed: string;
}
