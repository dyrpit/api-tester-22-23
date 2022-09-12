import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { TaskModule } from './task/task.module';

import { AppController } from './app.controller';

import { AppService } from './app.service';

@Module({
  imports: [
    TaskModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(`${process.env.MONGO_URI}`, {
      dbName: 'task-menager',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
