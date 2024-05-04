import { Controller, Param, Patch, Body, Res, Get } from '@nestjs/common';
import { UpdateUserService } from '../service/update.service';
import { createUserDetails } from '../interface/data.interface';
import { InjectModel } from '@nestjs/sequelize';
import { UserDetails } from 'src/config/model/UserDeatils.model';
import { Response } from 'express';

@Controller('UpdateUser')
export class UpdateUserController {
  constructor(
    private updateuserdetails: UpdateUserService,
    @InjectModel(UserDetails) private userdetailsmodel: typeof UserDetails,
  ) {}

  @Patch(':id')
  async updateUserDetails(
    @Param('id') id: number,
    @Body() data: createUserDetails,
    @Res() res: Response,
  ) {
    try {
      const value = await this.updateuserdetails.update(id, data);
      return res.json({ STATUS_CODES: 200, message: value });
    } catch (error) {
      return res.json({ STATUS_CODES: 400, message: 'something went wrong' });
    }
  }

  @Get('describe')
  async describedata(@Res() res: Response) {
    try {
      const val = await this.userdetailsmodel.describe();
      return res.status(200).json({ message: val });
    } catch (error) {
      throw new Error('Some thinh went wrong');
    }
  }
}
