import { ApiProperty } from '@nestjs/swagger';

import { User } from '../entity/user.entity';

export enum ROLE {
  ADMIN = 'admin',
  USER = 'user',
}

export type SanitizedUserType = Omit<User, 'password'>;

export class SanitizedUser implements SanitizedUserType {
  @ApiProperty({ description: 'User ID' })
  _id: string;

  @ApiProperty({ description: 'User email' })
  email: string;

  @ApiProperty({ description: 'User role', enum: ROLE })
  role: ROLE;

  @ApiProperty({ description: 'User creation date' })
  creationDate: Date;
}
