import {
  LikeCollectionProvider,
  NewFeedCollectionProvider,
  UserCollectionProvider,
} from '@collections/providers';
import { Injectable, Scope } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import { InjectLoggerContext, Logger } from '@providers/logger';
import { Like, NewFeed, User } from '@schemas';
import { MessageResponse, MsgResponse } from '@use-cases/response.model';

@Injectable({ scope: Scope.TRANSIENT })
export class LikeService {
  constructor(
    @InjectLoggerContext(LikeService.name) private readonly logger: Logger,
    private readonly likeCollection: LikeCollectionProvider,
    private readonly userCollection: UserCollectionProvider,
    private readonly newFeedCollection: NewFeedCollectionProvider,
  ) {}

  async get(
    idUser: string,
    idNewFeed: string,
  ): Promise<MessageResponse & Record<'liked', Like>> {
    const like = await this.likeCollection.findOneAsync({
      id_User: idUser,
      id_Newfeed: idNewFeed,
    });

    if (!like) {
      throw new BadRequestException(MsgResponse('Like not found'));
    }

    return { msg: 'Get like', liked: like };
  }

  async post(
    idUser: string,
    idNewFeed: string,
  ): Promise<MessageResponse | (MessageResponse & Record<'liked', Like>)> {
    const user = await this.userCollection.findByIdAsync(idUser);

    if (!user) {
      throw new BadRequestException(MsgResponse('User not found'));
    }

    const newFeed = await this.newFeedCollection.findByIdAsync(idNewFeed);

    if (!newFeed) {
      throw new BadRequestException(MsgResponse('New feed not found'));
    }

    const userLikeInNewFeed = await this.likeCollection.findOneAsync({
      id_User: idUser,
      id_Newfeed: idNewFeed,
    });

    if (userLikeInNewFeed) {
      return { msg: 'Like exist' };
    }

    // save new like
    const newLike = new Like(idUser, idNewFeed, true);
    const saveLikeResult = await this.likeCollection.saveAsync(newLike);

    if (saveLikeResult.created) {
      // update NewFeed like number;
      await this.newFeedCollection.updateOneAsync(
        { id: idNewFeed },
        {
          $set: {
            like: newFeed.like + 1,
            id_impact: idUser.toString(),
          },
        },
      );
    }

    newLike.id = saveLikeResult.id;
    return { msg: 'Success', liked: newLike };
  }

  async updateLike(
    userID: string,
    newFeedID: string,
  ): Promise<MessageResponse & Record<'id_Newfeed', string>> {
    const userLikeNewFeed = await this.likeCollection.findOneAsync({
      id_User: userID,
      id_Newfeed: newFeedID,
    });

    // check existed user
    const user = await this.userCollection.findByIdAsync(userID);
    if (!user) {
      throw new BadRequestException(MsgResponse('User not found'));
    }

    // check existed new feed.
    const newFeed = await this.newFeedCollection.findByIdAsync(newFeedID);
    if (!newFeed) {
      throw new BadRequestException(MsgResponse('New feed not found'));
    }

    if (!userLikeNewFeed) {
      await this.takeLikeAffectOnNewFeed(user, newFeed);
      return { msg: 'Like success', id_Newfeed: newFeed.id };
    } else {
      await this.takeUnlikeAffectOnNewFeed(user, newFeed, userLikeNewFeed);
      return { msg: 'Unlike success', id_Newfeed: newFeed.id };
    }
  }

  async deleteLike(
    userID: string,
    newFeedID: string,
  ): Promise<MessageResponse & any> {
    const userLikeNewFeed = this.likeCollection.findOneAsync({
      id_User: userID,
      id_Newfeed: newFeedID,
    });
    if (!userLikeNewFeed) {
      throw new BadRequestException(MsgResponse("Don't delete liked user"));
    }

    const deleteLikeResult = await this.likeCollection.removeAsync({
      id_User: userID,
      id_Newfeed: newFeedID,
    });

    if (deleteLikeResult.deleted) {
      return { msg: 'Delete success', likedse: deleteLikeResult };
    }

    return { msg: "Don't delete like user", likedse: deleteLikeResult };
  }

  private async takeUnlikeAffectOnNewFeed(
    user: User,
    newFeed: NewFeed,
    userLikeNewFeed: Like,
  ) {
    const unlikeResult = await this.likeCollection.updateOneAsync(
      { id_User: user.id, id_Newfeed: newFeed.id },
      {
        $set: {
          liked: !userLikeNewFeed.liked,
        },
      },
    );

    if (unlikeResult.acknowledged && unlikeResult.modifiedCount > 0) {
      // update NewFeed likes count.
      await this.newFeedCollection.updateOneAsync(
        { id: newFeed.id },
        {
          $set: {
            like: newFeed.like - 1,
          },
          $pull: {
            allIdReact: user.id,
          },
        },
      );
    }
  }

  private async takeLikeAffectOnNewFeed(user: User, newFeed: NewFeed) {
    const newLike = new Like(user.id, newFeed.id, true);
    await this.likeCollection.saveAsync(newLike);

    await this.newFeedCollection.updateOneAsync(
      { id: newFeed.id },
      {
        $set: {
          like: newFeed.like + 1,
          id_impact: user.id,
        },
        $push: {
          allIdReact: user.id,
        },
      },
    );
  }
}
