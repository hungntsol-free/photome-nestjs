import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseRootDocument } from './document.base';
@Schema()
export class NewFeed extends BaseRootDocument {
  constructor(
    idUser: string,
    status: string | undefined | null,
    image: string,
    like: number,
    comment: number,
    idImpact: string | undefined | null,
    allIdReact: string[],
  ) {
    super();
    this.id_User = idUser;
    this.status = status;
    this.image = image;
    this.like = like;
    this.comment = comment;
    this.id_impact = idImpact;
    this.allIdReact = allIdReact;
  }

  @Prop({ required: true })
  id_User: string;

  @Prop()
  status?: string;

  @Prop({ required: true })
  image: string;

  @Prop({ default: 0 })
  like: number;

  @Prop({ default: 0 })
  comment: number;

  @Prop()
  id_impact?: string;

  @Prop()
  allIdReact?: string[];
}

export const NewfeedSchema = SchemaFactory.createForClass(NewFeed);
