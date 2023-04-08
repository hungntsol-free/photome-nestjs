import { Injectable, Scope } from '@nestjs/common';
import { SignUpInfoDto } from '@providers/auth/auth.dto';
import { AuthService } from '@providers/auth/auth.service';
import { SignUpRequest } from './user.request';

@Injectable({ scope: Scope.TRANSIENT })
export class UserService {
  constructor(private readonly auth: AuthService) {}

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
