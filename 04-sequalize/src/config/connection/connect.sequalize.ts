import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { User } from '../model/User.model';
import { UserDetails } from '../model/UserDeatils.model';
import { Task } from '../model/Taks.model';
import { Image } from '../model/Image.model';

export const base: SequelizeModuleOptions = {
  dialect: 'mysql',
  port: 3306,
  host: 'localhost',
  username: 'tva',
  password: 'mnm',
  database: 'sequalize',
  autoLoadModels: true,
  models: [User, UserDetails, Task, Image],
  synchronize: true,
};
