import { Document } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

import { ROLE } from '../types/user.types';

export type UserDocument = User & Document;

@Schema({ collection: 'user' })
export class User {
  @ApiProperty({ description: 'User ID' })
  _id: string;

  @ApiProperty({ description: 'User email' })
  @Prop({ required: true })
  email: string;

  @ApiProperty({ description: 'User password' })
  @Prop({ required: true })
  password: string;

  @ApiProperty({ description: 'User role', enum: ROLE })
  @Prop({ enum: ROLE, default: ROLE.USER })
  role: ROLE;

  @ApiProperty({ description: 'User creation date' })
  @Prop({ default: new Date() })
  creationDate: Date;
}

export const UserSchema = SchemaFactory.createForClass(User).set(
  'versionKey',
  false,
);
