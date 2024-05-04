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
export class Image extends Model<Image> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => User)
  @PrimaryKey
  @Column
  userId: number;

  @Column({ defaultValue: 0 })
  filename: string;

  @Column({ defaultValue: 0 })
  size: number;

  @Column({ defaultValue: 0 })
  content: Buffer;
}
