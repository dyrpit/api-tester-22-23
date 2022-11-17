import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ROLE } from '../types/user.types';

export type UserDocument = User & Document;

@Schema({ collection: 'user' })
export class User {
  _id: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ enum: ROLE, default: ROLE.USER })
  role: ROLE;

  @Prop({ default: new Date() })
  creationDate: Date;
}

export const UserSchema = SchemaFactory.createForClass(User).set(
  'versionKey',
  false,
);
