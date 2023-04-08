import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseDocument } from './document.base';

@Schema()
export class Post extends BaseDocument {
  constructor(username: string, photo: string, desc?: string) {
    super();
    this.username = username;
    this.photo = photo;
    this.description = desc;
  }

  @Prop({ required: true })
  username: string;

  @Prop()
  photo: string;

  @Prop()
  description?: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
