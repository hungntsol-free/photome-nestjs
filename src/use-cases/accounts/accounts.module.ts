import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './accounts.controller';

@Module({
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
