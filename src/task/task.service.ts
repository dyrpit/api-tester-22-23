import { Model } from 'mongoose';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Task, TaskDocuemnt } from './entity/task.entity';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

import { QueryFilter } from './types/task.type';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocuemnt>) {}

  async create(data: CreateTaskDto, userId: string): Promise<Task> {
    const newTaskData = { ...data, creationDate: new Date(), userId };
    try {
      const newTask = new this.taskModel(newTaskData);
      return newTask.save();
    } catch (e) {
      throw new HttpException('Could not create task', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(queryFilter: QueryFilter): Promise<Task[]> {
    try {
      return this.taskModel.find(queryFilter);
    } catch (e) {
      throw new HttpException('Could not find any tasks', HttpStatus.NOT_FOUND);
    }
  }

  async findOne(id: string): Promise<Task> {
    try {
      return this.taskModel.findById(id);
    } catch (e) {
      throw new HttpException(
        `Task with ID ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async updateTask(data: UpdateTaskDto, id: string): Promise<Task> {
    try {
      return this.taskModel.findByIdAndUpdate(id, data, {
        returnDocument: 'after',
      });
    } catch (e) {
      throw new HttpException(
        `Could not update task with ID ${id}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deleteTask(id: string): Promise<Task> {
    try {
      return this.taskModel.findByIdAndDelete(id);
    } catch (e) {
      throw new HttpException(
        `Could not delete task with ID ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
