import { Prop } from '@nestjs/mongoose';

export abstract class BaseDocument {
  id: string;
}

export abstract class BaseRootDocument extends BaseDocument {
  @Prop({ default: Date.now() })
  registration_data: Date;
}
