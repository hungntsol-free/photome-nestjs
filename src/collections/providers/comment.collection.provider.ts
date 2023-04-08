import { Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Comment } from '@schemas';
import mongoose from 'mongoose';
import { PersistData } from '../persists';

@Injectable({ scope: Scope.TRANSIENT })
export class CommentCollectionProvider extends PersistData<Comment> {
  constructor(@InjectModel(Comment.name) model: mongoose.Model<Comment>) {
    super(model);
  }
}
