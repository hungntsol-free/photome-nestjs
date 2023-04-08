import { Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from '@schemas';
import mongoose from 'mongoose';
import { PersistData } from '../persists';

@Injectable({ scope: Scope.TRANSIENT })
export class PostCollectionProvider extends PersistData<Post> {
  constructor(@InjectModel(Post.name) model: mongoose.Model<Post>) {
    super(model);
  }
}
