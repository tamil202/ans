import { Injectable } from '@nestjs/common';
import { Task } from 'src/config/model/Taks.model';
import { CreateTodo } from '../interface/data.interface';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class AddTaskService {
  constructor(@InjectModel(Task) private usertaskmodel: typeof Task) {}

  addtask = async (userid: any, data: CreateTodo): Promise<any> => {
    try {
      const { task, descrption } = data;
      await this.usertaskmodel.create({
        userId: userid,
        task: task,
        descrption: descrption,
      });
      return { message: 'task added' };
    } catch (error) {
      throw new Error('some thing went wrong');
    }
  };
}
