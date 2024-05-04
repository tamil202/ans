import { InjectModel } from '@nestjs/sequelize';
import { User } from '../../config/model/User.model';
import { UserDetails } from '../../config/model/UserDeatils.model';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class FinduserService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    @InjectModel(UserDetails)
    private userDetailsModel: typeof UserDetails,
  ) {}

  //  all user return
  findUser = async () => {
    try {
      const users = await this.userModel.findAll({
        include: [{ model: UserDetails }],
      });
      return users;
    } catch (error) {
      console.error('Error', error);
      throw error;
    }
  };

  //  single user return
  findById = async (id: number) => {
    try {
      console.log(id);
      const user = await this.userModel.findOne({
        where: { userId: id },
      });
      if (!user) throw new NotFoundException();
      console.log(user);
      return user;
    } catch (error) {
      throw error;
    }
  };

  //  single user  Details return
  findByIdDeatils = async (id: number) => {
    try {
      console.log(id);
      const user = await this.userDetailsModel.findOne({
        where: { userId: id },
      });
      return user;
    } catch (error) {
      throw error;
    }
  };
}
// where: { userId: id },
//         include: [{ model: UserDetails, required: true }],
