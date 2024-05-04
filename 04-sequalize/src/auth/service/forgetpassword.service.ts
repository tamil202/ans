import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { User } from 'src/config/model/User.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class ForgetPasswordService {
  constructor(@InjectModel(User) private userModel: typeof User) {}
  // auth for admin mail and what type of service
  transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'test131.api@gmail.com',
      pass: 'fcpv dfhh svbq xkur',
    },
  });
  // GLOBAL VALUE
  otp: number = 0;

  // mail format
  mailOptions = (email: any) => {
    //   random number generate
    const random = Math.floor(1000 + Math.random() * 1000);
    this.otp = random;
    //    send type
    return {
      from: 'test131.api@gmail.com',
      to: email,
      subject: 'OTP Verification',
      text: `Your OTP is: ${random}. vaild for 5 minutes!`,
    };
  };
  sendMail = async (emails: any): Promise<any> => {
    try {
      // find mail
      const { email } = emails;
      const findUser = await this.userModel.findOne({
        where: { email: email },
      });
      if (!findUser) {
        throw new Error('no user found');
      } else {
        return this.transport.sendMail(
          this.mailOptions(email),
          (error, info) => {
            if (error) {
              throw new Error('Something went wrong otp sended');
            } else {
              setTimeout(() => {
                this.otp = 0;
              }, 300000);
              console.log(this.otp);
              console.log(info.response);
              return info.response;
            }
          },
        );
      }
    } catch (error) {
      console.log(error);
      throw new Error('Something went wrong otp sedned');
    }
  };

  // global value send
  getopt = () => {
    return this.otp;
  };
}
