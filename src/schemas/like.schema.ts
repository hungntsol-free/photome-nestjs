import { BaseRootDocument } from './document.base';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Like extends BaseRootDocument {
  constructor(idUser: string, idNewfeed: string, liked: boolean) {
    super();
    this.id_User = idUser;
    this.id_Newfeed = idNewfeed;
    this.liked = liked;
  }

  @Prop({ required: true })
  id_User: string;

  @Prop({ required: true })
  id_Newfeed: string;

  @Prop({ default: true })
  liked: boolean;
}

export const LikeSchema = SchemaFactory.createForClass(Like);
