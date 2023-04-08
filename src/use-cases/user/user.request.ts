import { IsNotEmpty, IsEmail } from 'class-validator';

export class SignUpRequest {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  sex: string;
}
