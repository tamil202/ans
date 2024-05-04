import {
  Model,
  Table,
  Column,
  AutoIncrement,
  ForeignKey,
  PrimaryKey,
} from 'sequelize-typescript';
import { User } from './User.model';

@Table
export class Task extends Model<Task> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => User)
  @PrimaryKey
  @Column
  userId: number;

  @Column
  task: string;

  @Column({
    defaultValue: '-',
  })
  descrption: string;
}
