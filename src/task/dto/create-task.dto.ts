import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsBoolean,
  IsArray,
  IsEnum,
  IsOptional,
} from 'class-validator';

import { PRIORITY } from '../types/task.type';

export class CreateTaskDto {
  @ApiProperty({
    description: 'Task title',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Determine if task is done',
  })
  @IsBoolean()
  @IsNotEmpty()
  isDone: boolean;

  @ApiPropertyOptional({
    description: 'Task priority level, default set to low',
    enum: PRIORITY,
    default: PRIORITY.LOW,
  })
  @IsOptional()
  @IsEnum(PRIORITY)
  priority?: PRIORITY;

  @ApiPropertyOptional({
    description: 'Task category tag',
    default: ['general'],
  })
  @IsOptional()
  @IsArray()
  category?: string[];
}
