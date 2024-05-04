import { Injectable } from '@nestjs/common';
import { createUser } from '../interface/auth.interface';
import { hash } from 'bcrypt';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/config/model/User.model';
// import { UserDetails } from 'src/config/model/UserDeatils.model';

@Injectable()
export class RegitserService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    // @InjectModel(UserDetails)
    // private readonly userDetailsModel: typeof UserDetails,
  ) {}

  // find user
  findUser = async (data: createUser): Promise<boolean> => {
    try {
      const { email } = data;
      const user = await this.userModel.findOne({
        where: { email: email },
      });
      return !!user;
    } catch (error) {
      console.error('something went wrong in finduer...', error);
    }
  };

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

  // create user
  createUser = async (data: createUser): Promise<any> => {
    const { username, email, password } = data;

    const findUser = await this.findUser(data);
    const hashPassword: any = await this.hashPassword(password);

    try {
      if (findUser) {
        throw new Error('User Already Existssssssss');
      } else {
        const userid = Math.floor(10000 + Math.random() * 10000);
        const userrole: string = 'USER';
        // user auth details
        await this.userModel.create({
          userId: userid,
          username,
          email,
          password: hashPassword,
          role: userrole,
        });
        // user datadetails default value make
        // await this.userDetailsModel.create({
        //   userId: userid,
        // });
        return data;
      }
    } catch (error) {
      console.error('some thing went wrong in creatreuser...', error);
      throw error;
    }
  };
}
