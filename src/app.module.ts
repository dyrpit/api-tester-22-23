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
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.i7ia4sr.mongodb.net/?retryWrites=true&w=majority`,
      { dbName: 'task-menager' },
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
