import {
  Controller,
  Get,
  Param,
  Body,
  Request,
  UseGuards,
  Post,
  HttpStatus,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

import { UsersService } from './users.service';

import { JwtAuthGuard } from '../utils/guards/jwt-auth.guard';
import { RolesGuard } from '../utils/guards/roles.guard';

import { User } from './entity/user.entity';

import { RegisterUserDto } from './dto/create-user.dto';
import { FindUserDto } from './dto/find-user.dto';

import { Roles } from '../utils/decorators/roles.decorator';

import { ROLE, SanitizedUser } from './types/user.types';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns new user',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Incorecct input data, cannot create user',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'User with given email already exists',
  })
  @Post('register')
  async create(@Body() registerUserDto: RegisterUserDto): Promise<User> {
    return this.usersService.create(registerUserDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE.ADMIN)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns users list',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Could not find any users',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Forbidden',
  })
  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE.ADMIN)
  @Get('email')
  findByEmail(@Body() findUserDto: FindUserDto): Promise<User> {
    return this.usersService.findByEmail(findUserDto.email);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req): SanitizedUser {
    return this.usersService.getProfile(req);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE.ADMIN, ROLE.USER)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(id);
  }
}
