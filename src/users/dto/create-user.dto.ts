import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

import { ROLE } from '../types/user.types';

export class RegisterUserDto {
  @ApiProperty({
    description: 'User email',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'User password',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiPropertyOptional({
    description: 'User role, if not specified deafult value will be "user"',
    enum: ROLE,
    default: ROLE.USER,
  })
  @IsOptional()
  @IsEnum(ROLE)
  @IsNotEmpty()
  role?: ROLE;
}
