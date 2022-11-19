import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export interface IAccessToken {
  accessToken: string | null;
}

export class AccessToken {
  @ApiProperty({ nullable: true })
  @IsString()
  accessToken: string | null;
}

export class LoginDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}
