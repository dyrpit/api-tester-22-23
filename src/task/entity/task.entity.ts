import mongoose from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { User } from '../../users/entity/user.entity';

import { PRIORITY } from '../types/task.type';

export type TaskDocuemnt = Task & Document;

@Schema({ collection: 'task' })
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true, default: false })
  isDone: boolean;

  @Prop({ enum: PRIORITY, default: PRIORITY.LOW })
  priority: PRIORITY;

  @Prop({ default: ['general'] })
  category: string[];

  @Prop({ default: new Date() })
  creationDate: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: User;
}

export const TaskSchema = SchemaFactory.createForClass(Task).set(
  'versionKey',
  false,
);
