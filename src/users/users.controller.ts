import {
  Controller,
  Get,
  Param,
  Body,
  Request,
  UseGuards,
  Post,
  HttpStatus,
  Delete,
  Patch,
} from '@nestjs/common';
import { ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';

import { UsersService } from './users.service';

import { JwtAuthGuard } from '../utils/guards/jwt-auth.guard';
import { RolesGuard } from '../utils/guards/roles.guard';

import { User } from './entity/user.entity';

import { RegisterUserDto } from './dto/create-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { Roles } from '../utils/decorators/roles.decorator';

import { SanitizedUser, ROLE, SanitizedUserType } from './types/user.types';

@ApiTags('user')
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Returns new user',
    type: User,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Incorecct input data, cannot create user',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'User with given email already exists',
  })
  async create(@Body() registerUserDto: RegisterUserDto): Promise<User> {
    return this.usersService.create(registerUserDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE.ADMIN)
  @Get()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns users list',
    type: [User],
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
    description: 'Forbidden, only user with admin role have access',
  })
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE.ADMIN)
  @Post('email')
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Returns users with given email',
    type: User,
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
    description: 'Forbidden, only user with admin role have access',
  })
  findByEmail(@Body() findUserDto: FindUserDto): Promise<User> {
    return this.usersService.findByEmail(findUserDto.email);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns currently logged user',
    type: SanitizedUser,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Could not find any users',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  getProfile(@Request() req): SanitizedUserType {
    return this.usersService.getProfile(req);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE.ADMIN, ROLE.USER)
  @Get(':id')
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns user with given ID',
    type: User,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Could not find user with given ID',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE.ADMIN, ROLE.USER)
  @Patch(':id')
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns updated user',
    type: User,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Could not find user with given ID',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  update(
    @Body() updateUserDto: UpdateUserDto,
    @Param('id') id: string,
  ): Promise<User> {
    return this.usersService.updateUser(updateUserDto, id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE.ADMIN, ROLE.USER)
  @Delete(':id')
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns deleted user',
    type: User,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Could not find user with given ID',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  delete(@Param('id') id: string): Promise<User> {
    return this.usersService.deleteUser(id);
  }
}
