import { Module } from '@nestjs/common';
import { RegisterController } from './controller/register.controller';
import { RegitserService } from './service/register.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/config/model/User.model';
import { UserDetails } from 'src/config/model/UserDeatils.model';
import { LoginController } from './controller/login.controller';
import { LoginService } from './service/login.service';
import { JwtModule } from '@nestjs/jwt';
import { ForgetPasswordController } from 'src/auth/controller/forgetpasswor-controller';
import { ForgetPasswordService } from 'src/auth/service/forgetpassword.service';
import { VerifiyOTPcontroller } from 'src/auth/controller/verifiyotp.controller';
import { UpdateUserController } from 'src/data/controller/updateuser.controller';
import { UpdatePasswordController } from 'src/data/controller/Update.controller';
import { UpdateUserService } from 'src/data/service/update.service';

@Module({
  imports: [
    SequelizeModule.forFeature([User, UserDetails]),
    JwtModule.register({
      secret: 'Abc=aBC',
      signOptions: {
        expiresIn: '2h',
      },
    }),
  ],
  controllers: [
    RegisterController,
    LoginController,
    ForgetPasswordController,
    VerifiyOTPcontroller,
    UpdateUserController,
    UpdatePasswordController,
  ],
  providers: [
    RegitserService,
    LoginService,
    ForgetPasswordService,
    UpdateUserService,
  ],
})
export class AuthModule {}
