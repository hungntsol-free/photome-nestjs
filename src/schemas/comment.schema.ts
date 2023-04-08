import { BaseRootDocument } from './document.base';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class Comment extends BaseRootDocument {
  constructor(idUser: string, idNewfeed: string, comment: string) {
    super();
    this.id_User = idUser;
    this.id_Newfeed = idNewfeed;
    this.comment = comment;
  }

  @Prop({ required: true })
  id_User: string;

  @Prop({ required: true })
  id_Newfeed: string;

  @Prop({ required: true })
  comment: string;
}

export type CommentDocument = HydratedDocument<Comment>;

export const CommentSchema = SchemaFactory.createForClass(Comment);
