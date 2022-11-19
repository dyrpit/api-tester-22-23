import * as bcrypt from 'bcrypt';

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';

import { IAccessToken } from './types/auth.types';
import { SanitizedUserType } from '../users/types/user.types';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<SanitizedUserType | null> {
    const user = await this.usersService.findByEmail(email);

    if (user && bcrypt.compareSync(password, user.password)) {
      const { password, ...restOfUser } = user;
      return restOfUser;
    }

    return null;
  }

  async login(user: SanitizedUserType): Promise<IAccessToken> {
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
