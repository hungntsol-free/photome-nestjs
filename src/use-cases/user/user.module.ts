import { Module } from '@nestjs/common';
import { AuthModule } from '@providers/auth/auth.module';
import { LoginController, UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [AuthModule],
  controllers: [UserController, LoginController],
  providers: [UserService],
})
export class UserModule {}
