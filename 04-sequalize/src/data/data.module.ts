import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/config/model/User.model';
import { UserDetails } from 'src/config/model/UserDeatils.model';
import { Image } from 'src/config/model/Image.model';
import { FinduserService } from './service/finduser.service';
import { FinduserController } from './controller/finduser.controller';
import { UpdateUserService } from './service/update.service';
import { UpdateUserController } from './controller/updateuser.controller';
import { Task } from 'src/config/model/Taks.model';
import { AddTaskController } from './controller/AddTask.controller';
import { AddTaskService } from './service/AddTask.service';
import { DeleteTaskController } from './controller/deleteTask.controller';
import { MulterModule } from '@nestjs/platform-express';
import { FileController } from './controller/FileUpload.controller';

@Module({
  imports: [
    SequelizeModule.forFeature([User, UserDetails, Task, Image]),
    MulterModule.register(),
  ],
  controllers: [
    FinduserController,
    UpdateUserController,
    AddTaskController,
    DeleteTaskController,
    FileController,
  ],
  providers: [FinduserService, UpdateUserService, AddTaskService],
})
export class DataModule {}
