import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { AccountService } from './account.service';

@Controller('api/account')
export class AccountController {
  constructor(private readonly service: AccountService) {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getUser(@Param('id') id: string) {
    return await this.service.getUser(id);
  }
}
