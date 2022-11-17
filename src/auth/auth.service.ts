import * as bcrypt from 'bcrypt';

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { SanitizedUser, UsersService } from 'src/users/users.service';

import { IAccessToken } from './types/auth.types';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<SanitizedUser | null> {
    const user = await this.usersService.findByEmail(email);

    if (user && bcrypt.compareSync(password, user.password)) {
      const { password, ...restOfUser } = user;
      return restOfUser;
    }

    return null;
  }

  async login(user: SanitizedUser): Promise<IAccessToken> {
    const payload = {
      email: user.email,
      id: user._id.toString(),
      role: user.role,
    };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async logout(): Promise<IAccessToken> {
    return {
      accessToken: null,
    };
  }
}
