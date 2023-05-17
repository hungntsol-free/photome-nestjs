import { Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '@schemas';
import mongoose from 'mongoose';
import { PersistData } from '../persists';

@Injectable({ scope: Scope.TRANSIENT })
export class UserModelService extends PersistData<User> {
  constructor(@InjectModel(User.name) model: mongoose.Model<User>) {
    super(model);
  }
}
