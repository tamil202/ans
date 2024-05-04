import { Injectable } from '@nestjs/common';
import { createUserDetails } from '../interface/data.interface';
import { UserDetails } from 'src/config/model/UserDeatils.model';
import { User } from 'src/config/model/User.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UpdateUserService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    @InjectModel(UserDetails)
    private readonly userDetailsModel: typeof UserDetails,
  ) {}

  //  update user details
  update = async (id: number, data: createUserDetails) => {
    try {
      const details = await this.userDetailsModel.findOne({
        where: { userId: id },
      });
      if (!details) {
        await this.userDetailsModel.create({ userId: id });
      }

      const userdet: createUserDetails = {
        userId: id,
        firstname: data.firstname,
        lastname: data.lastname,
        age: data.age,
        mobile: data.mobile,
        gender: data.gender,
        profession: data.profession,
        address: data.address,
        country: data.country,
        pin: data.pin,
      };

      return await this.userDetailsModel.update(userdet, {
        where: { userId: id },
      });
    } catch (error) {
      throw error;
    }
  };
}
