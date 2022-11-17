import {
  Controller,
  Get,
  Post,
  Body,
  HttpStatus,
  Param,
  Patch,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { TaskService } from './task.service';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

import { JwtAuthGuard } from '../utils/guards/jwt-auth.guard';
import { RolesGuard } from '../utils/guards/roles.guard';

import { Roles } from '../utils/decorators/roles.decorator';

import { ROLE } from '../users/types/user.types';
import { Task } from './entity/task.entity';

@ApiTags('task')
@Controller('task')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Roles(ROLE.ADMIN, ROLE.USER)
  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns tasks list, depend on user role',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Could not find any tasks',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  findAll(@Request() req): Promise<Task[]> {
    const queryFilter =
      req?.user?.role === ROLE.USER
        ? { userId: req.user.userId as string }
        : {};
    return this.taskService.findAll(queryFilter);
  }

  @Roles(ROLE.USER, ROLE.ADMIN)
  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns task with given ID',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Incorrect task ID, cannot get task',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  findOne(@Param('id') id: string): Promise<Task> {
    return this.taskService.findOne(id);
  }

  @Roles(ROLE.USER, ROLE.ADMIN)
  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Returns newly created task, new task successfully created',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Incorecct input data, cannot create task',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  create(@Body() createTaskDto: CreateTaskDto, @Request() req): Promise<Task> {
    const userId = req.user.userId as string;
    return this.taskService.create(createTaskDto, userId);
  }

  @Roles(ROLE.USER, ROLE.ADMIN)
  @Patch(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns udpated task, task successfully updated',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Incorrect input data, cannot update task',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  update(
    @Body() updateTaskDto: UpdateTaskDto,
    @Param('id') id: string,
  ): Promise<Task> {
    return this.taskService.updateTask(updateTaskDto, id);
  }

  @Roles(ROLE.USER, ROLE.ADMIN)
  @Delete(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns removed task, task successfully removed',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Incorrect ID, cannot remove task',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  delete(@Param('id') id: string): Promise<Task> {
    return this.taskService.deleteTask(id);
  }
}
