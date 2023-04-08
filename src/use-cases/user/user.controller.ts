import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService, SignIn, SignUp } from '@providers/auth';
import { SignInRequest, SignUpRequest } from './user.request';

@Controller('api/user')
export class UserController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async signUp(@Body() request: SignUpRequest) {
    return await this.authService.signUp(
      new SignUp(request.email, request.password, request.name, request.sex),
    );
  }
}

@Controller('api/login')
export class LoginController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() request: SignInRequest) {
    return await this.authService.signIn(
      new SignIn(request.email, request.password),
    );
  }
}
