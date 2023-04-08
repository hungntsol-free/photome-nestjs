import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseRootDocument } from './document.base';

@Schema()
export class Profile extends BaseRootDocument {
  constructor(
    idUser: string,
    name: string,
    birthday?: string,
    avatar?: string,
    sex?: string,
    intro?: string,
    job?: string,
    iconjob?: string,
    post?: number,
    follow?: number,
    following?: number,
  );

  constructor(
    idUser: string,
    name: string,
    birthday?: string,
    avatar?: string,
    sex?: string,
    intro?: string,
    job?: string,
    iconjob?: string,
    post?: number,
    follow?: number,
    following?: number,
  ) {
    super();
    this.id_User = idUser;
    this.name = name;
    this.birthday = birthday;
    this.avatar = avatar;
    this.sex = sex;
    this.intro = intro;
    this.job = job;
    this.iconjob = iconjob;
    this.post = post;
    this.follow = follow;
    this.following = following;
  }

  @Prop({ required: true })
  id_User: string;

  @Prop()
  birthday?: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  avatar?: string;

  @Prop()
  sex?: string;

  @Prop()
  intro?: string;

  @Prop()
  job?: string;

  @Prop()
  iconjob?: string;

  @Prop({ default: 0 })
  post: number;

  @Prop({ default: 0 })
  follow: number;

  @Prop({ default: 0 })
  following: number;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
