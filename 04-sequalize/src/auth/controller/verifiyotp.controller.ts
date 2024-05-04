import { Controller, Body, Post, Res } from '@nestjs/common';
import { OTP } from '../interface/auth.interface';
import { Response } from 'express';
import { ForgetPasswordService } from 'src/auth/service/forgetpassword.service';
// import { Response } from 'express';

@Controller('verifiyotp')
export class VerifiyOTPcontroller {
  constructor(private forgetpasswordservice: ForgetPasswordService) {}
  @Post('verify')
  async verifyOTP(@Body() verifyOTP: OTP, @Res() res: Response) {
    const { otp } = verifyOTP;

    const value = this.forgetpasswordservice.getopt();
    console.log('otp.....', value);
    console.log('coming....', verifyOTP);
    console.log(otp, 'otp.....');

    if (value == otp) {
      return res.json({ status: 200, message: 'verified' });
    } else {
      throw new Error('Invalid OTP');
    }
  }
}
