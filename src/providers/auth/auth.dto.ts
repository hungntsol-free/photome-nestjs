export class SignInDto {
  constructor(public email: string, public password: string) {}
}

export class SignUpInfoDto {
  constructor(
    public email: string,
    public plainPassword: string,
    public name: string,
    public sex?: string,
  ) {}
}
