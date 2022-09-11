import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

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

  @Prop([String])
  category: string[];

  @Prop()
  creationDate: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
