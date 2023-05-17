import { FollowModelService } from '@collections/providers';
import { Injectable, Scope } from '@nestjs/common';
import { MessageResponse } from '@use-cases/response.model';

@Injectable({ scope: Scope.TRANSIENT })
export class FollowService {
  constructor(private readonly followCollection: FollowModelService) {}

  async getAllOfUser(idUser: string): Promise<MessageResponse & any> {
    const userFollow = await this.followCollection
      .asModel()
      .findOne({ id_User: idUser })
      .sort({ registration_data: -1 });

    if (!userFollow) {
      return { msg: 'Error' };
    }

    return { follow: userFollow };
  }
}
