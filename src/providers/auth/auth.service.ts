import { OnAuthResponse, SignIn, SignUp } from './auth.model';

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
import { User } from '@schemas';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { AuthPayload } from './auth.payload';

@Injectable({ scope: Scope.TRANSIENT })
export class AuthService {
  private readonly CREDENTIAL_INCORRECT_ERROR = "Invalid credentials'";

  constructor(
    private readonly collection: UserCollectionProvider,
    private readonly jwtService: JwtService,
    @InjectLoggerContext(AuthService.name) private readonly logger: Logger,
  ) {}

  /**
   * Sign in user with email & password.
   * @param dto
   * @returns access token and user information.
   */
  async signIn(dto: SignIn): Promise<OnAuthResponse> {
    const user = await this.collection.findOneAsync({ email: dto.email });

    if (!user) {
      throw new BadRequestException({ msg: this.CREDENTIAL_INCORRECT_ERROR });
    }

    const pwMatch = await argon2.verify(user.password, dto.password);

    if (!pwMatch) {
      throw new BadRequestException({ msg: this.CREDENTIAL_INCORRECT_ERROR });
    }

    return new OnAuthResponse(await this.signJwtToken(user), user);
  }

  /**
   * Create new user.
   * @param dto
   * @return id of created document.
   */
  async signUp(dto: SignUp): Promise<OnAuthResponse> {
    if (await this.isEmailExisted(dto.email)) {
      throw new HttpException({ msg: 'User existed' }, HttpStatus.BAD_REQUEST);
    }

    const hashPw = await argon2.hash(dto.plainPassword);
    const user = new User(dto.email, hashPw, dto.name, dto.sex);

    try {
      const { id } = await this.collection.saveAsync(user);

      this.logger.log(`Create new user {email: ${user.email}}`);
      user.id = id;

      return new OnAuthResponse(await this.signJwtToken(user), user);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException();
    }
  }

  /**
   * Get current user of context.
   */
  async currentUser(payloadCtx: AuthPayload): Promise<User> {
    const user = await this.collection
      .asModel()
      .findById(payloadCtx.id)
      .select('-password');

    return user;
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

  /**
   * Sign a JWT access token.
   * @param user User instance
   * @returns access token
   */
  private async signJwtToken(user: User): Promise<string> {
    const payload: AuthPayload = { id: user.id, email: user.email };
    return await this.jwtService.signAsync(payload);
  }
}
