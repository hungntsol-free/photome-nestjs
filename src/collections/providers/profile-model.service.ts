import { Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Profile } from '@schemas';
import mongoose from 'mongoose';
import { PersistData } from '../persists';

@Injectable({ scope: Scope.TRANSIENT })
export class ProfileModelService extends PersistData<Profile> {
  constructor(@InjectModel(Profile.name) model: mongoose.Model<Profile>) {
    super(model);
  }
}
