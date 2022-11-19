import mongoose from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

import { User } from '../../users/entity/user.entity';

import { PRIORITY } from '../types/task.type';

export type TaskDocuemnt = Task & Document;

@Schema({ collection: 'task' })
export class Task {
  @ApiProperty({ description: 'Task title' })
  @Prop({ required: true })
  title: string;

  @ApiProperty({ description: 'Determines if task is done' })
  @Prop({ required: true, default: false })
  isDone: boolean;

  @ApiProperty({ description: 'Task priority level', enum: PRIORITY })
  @Prop({ enum: PRIORITY, default: PRIORITY.LOW })
  priority: PRIORITY;

  @ApiProperty({ description: 'Task category', default: ['general'] })
  @Prop({ default: ['general'] })
  category: string[];

  @ApiProperty({ description: 'Task creation date in UTC' })
  @Prop({ default: new Date() })
  creationDate: Date;

  @ApiProperty({ description: 'User ID' })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: User;
}

export const TaskSchema = SchemaFactory.createForClass(Task).set(
  'versionKey',
  false,
);
