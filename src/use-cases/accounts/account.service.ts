import { UserModelService } from '@collections/providers';
import { Injectable, Scope } from '@nestjs/common';
import { User } from '@schemas';

@Injectable({ scope: Scope.TRANSIENT })
export class AccountService {
  constructor(private readonly userCollection: UserModelService) {}

  async getUser(id: string): Promise<User> {
    return await this.userCollection.asModel().findById(id).select('-password');
  }
}
