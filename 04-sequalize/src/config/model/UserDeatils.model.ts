import {
  Model,
  Column,
  PrimaryKey,
  AutoIncrement,
  Table,
  BeforeCreate,
  BeforeUpdate,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from './User.model';

@Table
export class UserDetails extends Model<UserDetails> {
  @ForeignKey(() => User)
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @PrimaryKey
  @Column
  userId: number;

  @Column({
    defaultValue: 'firstname',
  })
  firstname: string;
  @Column({
    defaultValue: 'lastname',
  })
  lastname: string;

  @Column({
    defaultValue: 0,
  })
  age: number;

  @Column({
    defaultValue: 0,
  })
  mobile: number;

  @Column({
    defaultValue: ' ',
  })
  gender: string;

  @Column({
    defaultValue: ' ',
  })
  profession: string;
  @Column({
    defaultValue: ' ',
  })
  address: string;

  @Column({
    defaultValue: ' ',
  })
  country: string;

  @Column({
    defaultValue: 0,
  })
  pin: number;

  @BeforeCreate
  @BeforeUpdate
  static convertlowercas(instance: UserDetails) {
    if (instance.firstname) {
      instance.firstname = instance.firstname.toLocaleLowerCase();
    }
    if (instance.lastname) {
      instance.lastname = instance.lastname.toLocaleLowerCase();
    }
    if (instance.gender) {
      instance.gender = instance.gender.toLocaleLowerCase();
    }
  }
}
