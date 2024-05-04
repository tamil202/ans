import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { base } from './config/connection/connect.sequalize';
import { DataModule } from './data/data.module';

@Module({
  imports: [SequelizeModule.forRoot(base), AuthModule, DataModule],
})
export class AppModule {}
