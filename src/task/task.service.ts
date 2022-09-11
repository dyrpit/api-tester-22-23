import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Task, TaskDocuemnt } from './entity/task.entity';

import { CreateTaskDto } from './dto/task.dto';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocuemnt>) {}

  async create(data: CreateTaskDto) {
    try {
      const newTask = new this.taskModel(data);
      return newTask.save();
    } catch (e) {
      throw new HttpException('Could not create tasks', HttpStatus.BAD_REQUEST);
    }
  }

  findAll() {
    try {
      return this.taskModel.find({});
    } catch (e) {
      throw new HttpException('Could not find tasks', HttpStatus.NOT_FOUND);
    }
  }

  async findOne(id: string) {
    try {
      const task = await this.taskModel.findById(id);
      return task;
    } catch (e) {
      throw new HttpException(
        'Could not find task by ID',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
