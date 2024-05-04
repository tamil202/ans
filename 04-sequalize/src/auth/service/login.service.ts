import { Injectable, NotFoundException } from '@nestjs/common';
import { userLogin } from '../interface/auth.interface';
import { User } from '../../config/model/User.model';
import { InjectModel } from '@nestjs/sequelize';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    private jwtService: JwtService,
  ) {}

  // compare password
  comparePassword = async (
    pasword: string,
    hashPassword: any,
  ): Promise<boolean> => {
    try {
      const comparePassword: boolean = await compare(pasword, hashPassword);
      return comparePassword;
    } catch (error) {
      console.error('some thing wend wrong in compare passwordd...', error);
      throw new Error('password wrong');
    }
  };

  // find user
  findUser = async (data: userLogin): Promise<any> => {
    try {
      const { email, password } = data;
      const user = await this.userModel.findOne({
        where: { email: email },
      });
      if (user) {
        if (await this.comparePassword(password, user.password)) {
          const { password, ...result } = user;
          this.jwtService.signAsync(result);
          return result;
        }
        throw new Error('username or password invalid');
      }
      throw new NotFoundException();
    } catch (error) {
      console.error('something went wrong in finduer...', error);
      throw new NotFoundException();
    }
  };
}
