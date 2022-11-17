import { User } from '../entity/user.entity';

export enum ROLE {
  ADMIN = 'admin',
  USER = 'user',
}

export type SanitizedUser = Omit<User, 'password'>;
