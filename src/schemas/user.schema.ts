import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseRootDocument } from './document.base';

@Schema()
export class User extends BaseRootDocument {
  constructor(email: string, password: string, name: string, sex: string);

  constructor(email: string, password: string, name: string, sex: string) {
    super();
    this.email = email;
    this.password = password;
    this.name = name;
    this.sex = sex;
  }

  @Prop({ required: true })
  public name: string;

  @Prop({ required: true, unique: true })
  public email: string;

  @Prop({ required: true })
  public password: string;

  @Prop()
  public sex?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
