import { User } from '@schemas';

/**
 * Sign in params.
 */
export class SignIn {
  constructor(public email: string, public password: string) {}
}

/**
 * Sign up params.
 */
export class SignUp {
  constructor(
    public email: string,
    public plainPassword: string,
    public name: string,
    public sex?: string,
  ) {}
}

class AuthUserInfo {
  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
  }

  id: string;
  name: string;
  email: string;
}

/**
 * Response model when perform authentication success.
 */
export class OnAuthResponse {
  constructor(public token: string, user: User) {
    this.user = new AuthUserInfo(user);
  }

  user: AuthUserInfo;
}
