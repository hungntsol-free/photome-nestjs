import { Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Like } from '@schemas';
import mongoose from 'mongoose';
import { PersistData } from '../persists';

@Injectable({ scope: Scope.TRANSIENT })
export class LikeModelService extends PersistData<Like> {
  constructor(@InjectModel(Like.name) model: mongoose.Model<Like>) {
    super(model);
  }
}
