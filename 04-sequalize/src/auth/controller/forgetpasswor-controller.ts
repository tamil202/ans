import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ForgetPasswordService } from 'src/auth/service/forgetpassword.service';

@Controller('forgetpassword')
export class ForgetPasswordController {
  constructor(private forgetpasswordservice: ForgetPasswordService) {}
  @Post()
  async forgetpassword(@Body() email: string, @Res() res: Response) {
    try {
      const val = await this.forgetpasswordservice.sendMail(email);
      res.status(200).json({ response: val, message: 'mail sended' });
    } catch (error) {
      res.status(404).json({ message: 'No User Found' });
    }
  }
}
