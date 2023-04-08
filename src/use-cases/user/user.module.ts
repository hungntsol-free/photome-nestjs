import { Module } from '@nestjs/common';
import { AuthModule } from '@providers/auth/auth.module';
import { LoginController, UserController } from './user.controller';

@Module({
  imports: [AuthModule],
  controllers: [UserController, LoginController],
})
export class UserModule {}
