import { Body, Controller, Param, Post, Res } from '@nestjs/common';
import { AddTaskService } from '../service/AddTask.service';
import { CreateTodo } from '../interface/data.interface';
import { Response } from 'express';

@Controller('addtask')
export class AddTaskController {
  constructor(private addtaskservice: AddTaskService) {}

  @Post(':id')
  async addtask(
    @Body() data: CreateTodo,
    @Param('id') id: number,
    @Res() res: Response,
  ) {
    try {
      const val = await this.addtaskservice.addtask(id, data);
      res.send(val);
    } catch (error) {
      res.send(error);
    }
  }
}
