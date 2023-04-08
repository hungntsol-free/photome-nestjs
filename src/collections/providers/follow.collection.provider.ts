import { Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Follow } from '@schemas';
import mongoose from 'mongoose';
import { PersistData } from '../persists';

@Injectable({ scope: Scope.TRANSIENT })
export class FollowCollectionProvider extends PersistData<Follow> {
  constructor(@InjectModel(Follow.name) model: mongoose.Model<Follow>) {
    super(model);
  }
}
