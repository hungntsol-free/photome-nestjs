import {
  CommentCollectionProvider,
  NewFeedCollectionProvider,
} from '@collections/providers';
import { Injectable, Scope, BadRequestException } from '@nestjs/common';
import { InjectLoggerContext, Logger } from '@providers/logger';
import { Comment } from '@schemas';
import { MessageResponse, MsgResponse } from '@use-cases/response.model';

@Injectable({ scope: Scope.TRANSIENT })
export class CommentService {
  constructor(
    private readonly commentCollection: CommentCollectionProvider,
    private readonly newFeedCollection: NewFeedCollectionProvider,
    @InjectLoggerContext(CommentService.name) private readonly logger: Logger,
  ) {}

  async getAllOfNewFeed(
    idNewFeed: string,
  ): Promise<MessageResponse & Record<'comment', Comment[]>> {
    const comments = await this.commentCollection
      .asModel()
      .find({ id_Newfeed: idNewFeed })
      .sort({ registration_data: -1 });

    if (!comments || comments.length === 0) {
      return { msg: "Comment don't have", comment: comments };
    }

    return { msg: 'Comment show', comment: comments };
  }

  async saveComment(
    idUser: string,
    idNewFeed: string,
    comment: string,
  ): Promise<MessageResponse & Record<'cmt', Comment>> {
    const user = await this.commentCollection.findByIdAsync(idUser);

    if (!user) {
      throw new BadRequestException(MsgResponse('User not found'));
    }

    const newFeed = await this.newFeedCollection.findByIdAsync(idNewFeed);

    if (!newFeed) {
      throw new BadRequestException(MsgResponse('NewFeed not found'));
    }

    const newComment = new Comment(idUser, idNewFeed, comment);
    const saveResult = await this.commentCollection.saveAsync(newComment);

    try {
      const updateResult = await this.newFeedCollection.updateOneAsync(
        { id: idNewFeed },
        {
          $set: {
            comment: newFeed.comment + 1,
            id_impact: idUser.toString(),
          },
        },
      );

      if (updateResult.acknowledged) {
        newComment.id = saveResult.id;
        return { msg: 'Success', cmt: newComment };
      }
    } catch (error) {
      this.logger.error(error);

      await this.commentCollection.removeAsync({ id: saveResult.id });

      throw new BadRequestException(
        MsgResponse('Comment success but update new feed fail'),
      );
    }
  }

  async deleteComment(
    idUser: string,
    idNewFeed: string,
    idComment: string,
  ): Promise<MessageResponse> {
    const newFeed = await this.newFeedCollection.findByIdAsync(idNewFeed);

    if (!newFeed) {
      throw new BadRequestException(MsgResponse('New feed not found'));
    }

    const deleteCommentResult = await this.commentCollection.removeAsync({
      id: idComment,
    });

    if (deleteCommentResult.deletedCount > 0) {
      this.logger.log(`Delete comment id ${idComment}`);
    }

    await this.newFeedCollection.updateOneAsync(
      { id: idNewFeed },
      {
        $set: {
          comment: newFeed.comment - deleteCommentResult.deletedCount,
        },
      },
    );

    return { msg: 'Delete success' };
  }
}
