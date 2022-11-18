import { Controller, UseGuards, Post, Request } from '@nestjs/common';

import { JwtAuthGuard } from '../utils/guards/jwt-auth.guard';
import { LocalAuthGuard } from '../utils/guards/local-auth.guard';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout() {
    return this.authService.logout();
  }
}
