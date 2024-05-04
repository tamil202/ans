import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { FinduserService } from '../service/finduser.service';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/config/model/User.model';
import { Task } from 'src/config/model/Taks.model';
import { UserDetails } from 'src/config/model/UserDeatils.model';
import { Image } from 'src/config/model/Image.model';

@Controller('Finduser')
export class FinduserController {
  constructor(
    private readonly finduserService: FinduserService,
    @InjectModel(User) private usermodel: typeof User,
    @InjectModel(Task) private taskmodel: typeof Task,
    @InjectModel(Image) private imagemodel: typeof Image,
  ) {}
  // usertasks find by id
  @Get('task/:id')
  async userandtask(@Res() res: Response, @Param('id') id: number) {
    try {
      const val = await this.taskmodel.findAll({
        where: { userId: id },
      });
      res.send(val);
    } catch (error) {
      res.send('not found');
    }
  }
  // finduser with tasks and details
  @Get('withtask/:id')
  async finduserwithtasks(@Res() res: Response, @Param('id') id: number) {
    try {
      const val = await this.usermodel.findAll({
        where: { userId: id },
        include: [{ model: Task }],
      });
      res.send(val);
    } catch (error) {
      res.send('not found');
    }
  }
  // find all user
  @Get()
  async findAlluser(@Res() res: Response) {
    try {
      const val = await this.finduserService.findUser();
      res.send(val);
    } catch (error) {
      res.send(error);
    }
  }

  // find single user
  @Get(':id')
  async FindById(@Res() res: Response, @Param('id') id: number) {
    try {
      const val = await this.finduserService.findById(id);
      res.send(val);
    } catch (error) {
      res.send(error);
    }
  }

  @Get('userdetails/:id')
  async FindByIdDetails(@Res() res: Response, @Param('id') id: number) {
    try {
      const val = await this.finduserService.findByIdDeatils(id);
      res.send(val);
    } catch (error) {
      res.send(error);
    }
  }

  @Get('image/:id')
  async getImage(@Res() res: Response, @Param('id') id: number) {
    try {
      const image = await this.imagemodel.findOne({
        where: { userId: id },
      });
      if (!image) return res.status(404).json({ message: 'no user image' });

      return res.status(200).json({ message: image });
    } catch (error) {
      res.status(400).json({ message: 'no image found' });
    }
  }
}
