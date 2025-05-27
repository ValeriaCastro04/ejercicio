import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { UsersModule } from '../users/users.module';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { User } from '../users/user.entity';

@Module({

    imports: [
        TypeOrmModule.forFeature([Task, User]),
        UsersModule,
    ],
    controllers: [TasksController],
    providers: [TasksService, TasksService],

})
export class TasksModule {}
