import { Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { NewFeed } from '@schemas';
import mongoose from 'mongoose';
import { PersistData } from '../persists';

@Injectable({ scope: Scope.TRANSIENT })
export class NewFeedModelService extends PersistData<NewFeed> {
  constructor(@InjectModel(NewFeed.name) model: mongoose.Model<NewFeed>) {
    super(model);
  }
}
