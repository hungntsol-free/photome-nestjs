import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  AuthService,
  SignIn,
  SignUp,
  AuthPayload,
  AuthGuard,
} from '@providers/auth';
import { Request as ExpressRequest } from 'express';
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

  @UseGuards(AuthGuard)
  @Get('user')
  @HttpCode(HttpStatus.OK)
  async getUser(
    @Request() req: ExpressRequest & Record<'authPayload', AuthPayload>,
  ) {
    return this.authService.currentUser(req.authPayload);
  }
}
