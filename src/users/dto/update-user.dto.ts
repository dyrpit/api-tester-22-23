import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ROLE } from '../types/user.types';

export class UpdateUserDto {
  @ApiPropertyOptional({
    description: 'User new password',
  })
  @IsOptional()
  @IsString()
  password?: string;

  @ApiPropertyOptional({
    description: 'User new role',
    enum: ROLE,
  })
  @IsOptional()
  @IsEnum(ROLE)
  role?: ROLE;
}
