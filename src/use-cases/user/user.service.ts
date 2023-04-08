import { Injectable, Scope } from '@nestjs/common';
import { SignInDto, SignUpInfoDto } from '@providers/auth/auth.dto';
import { AuthService } from '@providers/auth/auth.service';
import { SignInRequest, SignUpRequest } from './user.request';

@Injectable({ scope: Scope.TRANSIENT })
export class UserService {
  constructor(private readonly auth: AuthService) {}

  async signIn(request: SignInRequest) {
    return this.auth.signIn(new SignInDto(request.email, request.password));
  }

  async signUp(request: SignUpRequest) {
    return this.auth.signUp(
      new SignUpInfoDto(
        request.email,
        request.password,
        request.name,
        request.sex,
      ),
    );
  }
}
