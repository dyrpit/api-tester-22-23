import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class FindUserDto {
  @ApiProperty({
    description: 'User email',
  })
  @IsEmail()
  email: string;
}
