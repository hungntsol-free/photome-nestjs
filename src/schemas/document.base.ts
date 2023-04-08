import { Prop } from '@nestjs/mongoose';

export abstract class BaseDocument {}

export abstract class BaseRootDocument {
  @Prop({ default: Date.now() })
  registration_data: Date;
}
