import { DbCollectionModule } from '@collections';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT__SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT__EXPIRE_IN'),
        },
      }),
      inject: [ConfigService],
      global: true,
    }),
    DbCollectionModule,
  ],
  exports: [AuthService],
  providers: [AuthService],
})
export class AuthModule {}
