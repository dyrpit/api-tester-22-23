import { Test, TestingModule } from '@nestjs/testing';
import { Task } from './entity/task.entity';
import { TaskController } from './task.controller';
import { PRIORITY } from './types/task.type';

describe('TaskController', () => {
  let taskController: TaskController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
    }).compile();

    taskController = module.get<TaskController>(TaskController);
  });

  it('should be defined', () => {
    expect(taskController).toBeDefined();
  });

  it('should return array of tasks', async () => {
    const result: Task[] = [
      {
        category: ['general'],
        creationDate: new Date(),
        isDone: true,
        priority: PRIORITY.LOW,
        title: 'Test',
      },
    ];

    jest
      .spyOn(taskController, 'findAll')
      .mockImplementation(() => result as Task[]);

    expect(await taskController.findAll()).toBe(result);
  });
});
