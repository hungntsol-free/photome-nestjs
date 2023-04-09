import { FollowCollectionProvider } from '@collections/providers';
import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class FollowService {
  constructor(private readonly followCollection: FollowCollectionProvider) {}

  async getAllOfUser(idUser: string) {
    const userFollow = await this.followCollection
      .asModel()
      .findOne({ id_User: idUser })
      .sort({ registration_data: -1 });

    if (!userFollow) {
      return { msg: 'Error' };
    }

    return userFollow;
  }
}
