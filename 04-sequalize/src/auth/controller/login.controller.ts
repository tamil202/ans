import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { userLogin } from '../interface/auth.interface';
import { LoginService } from '../service/login.service';

@Controller('LoginUser')
export class LoginController {
  constructor(private loginService: LoginService) {}
  // create user controller
  @Post()
  async createUser(@Res() res: Response, @Body() data: userLogin) {
    try {
      const user = await this.loginService.findUser(data);

      res.cookie('jwt', user, { httpOnly: true });
      res.status(200).json({ STATUS_CODES: 200, message: user });
    } catch (error) {
      res.send(error);
    }
  }
}
