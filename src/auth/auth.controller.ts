import {
  Controller,
  UseGuards,
  Post,
  Request,
  HttpStatus,
} from '@nestjs/common';
import { ApiBody, ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../utils/guards/jwt-auth.guard';
import { LocalAuthGuard } from '../utils/guards/local-auth.guard';

import { AuthService } from './auth.service';

import { IAccessToken, AccessToken, LoginDto } from './types/auth.types';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({
    type: LoginDto,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Returns JWT access token',
    type: AccessToken,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  async login(@Request() req): Promise<IAccessToken> {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @ApiHeader({ name: 'Authorization', description: 'Bearer token' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Returns empty access token',
    type: AccessToken,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  async logout(): Promise<IAccessToken> {
    return this.authService.logout();
  }
}
