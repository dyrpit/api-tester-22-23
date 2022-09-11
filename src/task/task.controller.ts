import { Controller, Get, Post, Body, HttpStatus, Param } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { TaskService } from './task.service';

import { CreateTaskDto } from './dto/task.dto';

@ApiTags('task')
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'All tasks list',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Could not get tasks list',
  })
  findAll() {
    return this.taskService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Task with given ID',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Wrong ID, cannot get task',
  })
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(id);
  }

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'New task successfully created',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Wrong input data, cannot create task',
  })
  create(@Body() createTaskdto: CreateTaskDto) {
    return this.taskService.create(createTaskdto);
  }
}
