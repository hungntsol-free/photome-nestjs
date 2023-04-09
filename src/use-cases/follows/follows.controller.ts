import { Controller } from '@nestjs/common';
import { Get, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { FollowService } from './follow.service';

@Controller('api/follow')
export class FollowController {
  constructor(private readonly service: FollowService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async get(@Query('id_User') idUser: string) {
    return await this.service.getAllOfUser(idUser);
  }
}
