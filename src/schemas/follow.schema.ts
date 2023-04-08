import { BaseRootDocument } from './document.base';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Follow extends BaseRootDocument {
  constructor(idUser: string, idFollow: string[], idFollowing: string[]) {
    super();
    this.id_User = idUser;
    this.id_follow = idFollow;
    this.id_following = idFollowing;
  }

  @Prop({ required: true })
  id_User: string;

  @Prop({ required: true })
  id_follow: string[];

  @Prop({ required: true })
  id_following: string[];
}

export const FollowSchema = SchemaFactory.createForClass(Follow);
