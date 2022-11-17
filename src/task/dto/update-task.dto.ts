import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';

import { PRIORITY } from '../types/task.type';

export class UpdateTaskDto {
  @ApiPropertyOptional({
    description: 'Task title',
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({
    description: 'Determine if task is done',
  })
  @IsOptional()
  @IsBoolean()
  isDone?: boolean;

  @ApiPropertyOptional({
    description: 'Task priority level',
    enum: PRIORITY,
  })
  @IsOptional()
  @IsEnum(PRIORITY)
  priority?: PRIORITY;

  @ApiPropertyOptional({
    description: 'Task category tag',
  })
  @IsOptional()
  @IsArray()
  category?: string[];
}
