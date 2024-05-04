import {
  Model,
  Table,
  Column,
  PrimaryKey,
  AutoIncrement,
  BeforeCreate,
  BeforeUpdate,
  HasOne,
  HasMany,
} from 'sequelize-typescript';
import { UserDetails } from './UserDeatils.model';
import { Task } from './Taks.model';
import { Image } from './Image.model';

@Table
export class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @PrimaryKey
  @Column
  userId: number;

  @Column
  username: string | null;

  @Column({ unique: true })
  email: string | null;

  @Column
  password: string | null;

  @Column({ defaultValue: 'USER' })
  role: string;

  @BeforeCreate
  @BeforeUpdate
  static convertUsernameToLowerCase(instance: User) {
    if (instance.username) {
      instance.username = instance.username.toLowerCase();
    }
  }
  @HasOne(() => UserDetails)
  userDetails: UserDetails;

  @HasOne(() => Image)
  image: Image;

  @HasMany(() => Task)
  taks: Task[];
}
