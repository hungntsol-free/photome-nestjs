import { SignInDto, SignUpInfoDto } from './auth.dto';

import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Scope,
} from '@nestjs/common';
import { UserCollectionProvider } from '@collections/providers';
import { InjectLoggerContext, Logger } from '@providers/logger';
import * as argon2 from 'argon2';
import { User } from '@schemas';

@Injectable({ scope: Scope.TRANSIENT })
export class AuthService {
  private readonly CREDENTIAL_INCORRECT_ERROR = "Invalid credentials'";

  constructor(
    private readonly collection: UserCollectionProvider,
    @InjectLoggerContext(AuthService.name) private readonly logger: Logger,
  ) {}

  /**
   * Sign in user with email & password.
   * @param dto
   * @returns access token and user information.
   */
  async signIn(dto: SignInDto): Promise<{
    token: string;
    user: { id: string; name: string; email: string };
  }> {
    const user = await this.collection.findOneAsync({ email: dto.email });

    if (!user) {
      throw new BadRequestException({ msg: this.CREDENTIAL_INCORRECT_ERROR });
    }

    const pwMatch = await argon2.verify(user.password, dto.password);

    if (!pwMatch) {
      throw new BadRequestException({ msg: this.CREDENTIAL_INCORRECT_ERROR });
    }

    return {
      token: '',
      user: { id: user.id, name: user.name, email: user.email },
    };
  }

  /**
   * Create new user.
   * @param dto
   * @return id of created document.
   */
  async signUp(dto: SignUpInfoDto): Promise<{ id: string }> {
    if (await this.isEmailExisted(dto.email)) {
      throw new HttpException({ msg: 'User existed' }, HttpStatus.BAD_REQUEST);
    }

    const hashPw = await argon2.hash(dto.plainPassword);
    const user = new User(dto.email, hashPw, dto.name, dto.sex);

    try {
      const { id } = await this.collection.saveAsync(user);

      this.logger.log(`Create new user {email: ${user.email}}`);

      return { id };
    } catch (error) {
      this.logger.error(error);

      throw new InternalServerErrorException();
    }
  }

  /**
   * Check if email is already used.
   */
  private async isEmailExisted(email: string): Promise<boolean> {
    const existedEmail = await this.collection.findOneAsync({ email });

    if (existedEmail) {
      return true;
    }

    return false;
  }
}
