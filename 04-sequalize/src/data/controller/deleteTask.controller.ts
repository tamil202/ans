import { Body, Controller, Param, Post } from '@nestjs/common';
// import { Response } from 'express';
import { DeleteTask } from '../interface/data.interface';
import { InjectModel } from '@nestjs/sequelize';
import { Task } from 'src/config/model/Taks.model';

@Controller('deletetask')
export class DeleteTaskController {
  constructor(@InjectModel(Task) private taskmodel: typeof Task) {}

  @Post(':userid')
  async deletetask(
    @Body() taskid: DeleteTask,
    @Param('userid') userid: number,
  ) {
    try {
      const { id } = taskid;
      return await this.taskmodel.destroy({
        where: { userId: userid, id: id },
      });
    } catch (error) {
      return { message: 'some thing went wrong' };
    }
  }
}
