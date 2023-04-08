import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { SignUpRequest } from './user.request';
import { UserService } from './user.service';

@Controller('api/user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async signUp(@Body() request: SignUpRequest) {
    return await this.service.signUp(request);
  }
}
