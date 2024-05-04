import { Controller, Body, Res, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Response } from 'express';
import { User } from 'src/config/model/User.model';
import { hash } from 'bcrypt';
import { Password } from '../interface/data.interface';

@Controller('updatepassword')
export class UpdatePasswordController {
  constructor(@InjectModel(User) private usermodel: typeof User) {}

  // hash password
  hashPassword = async (password: string): Promise<string> => {
    try {
      const HashPassword: any = await hash(password, 10);
      return HashPassword;
    } catch (error) {
      console.error('some thing went wrong hash password', error);
      throw error;
    }
  };

  @Post('update')
  async updatepassword(@Res() res: Response, @Body() userdata: Password) {
    const { email, password } = userdata;
    const hashPassword = await this.hashPassword(password);

    try {
      console.log('email----', email);
      console.log('password----', password);
      const data: Password = {
        password: hashPassword,
      };
      console.log('new password------', data.password);

      const newpasswordupdate = await this.usermodel.update(data, {
        where: { email: email },
      });
      return res
        .status(200)
        .json({ messgae: 'updated', value: newpasswordupdate });
    } catch (error) {
      res.status(400).json({ messgae: error });
      console.error('some thing went wrong', error);
    }
  }
}
