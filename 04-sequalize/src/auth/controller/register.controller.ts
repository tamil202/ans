import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { createUser } from '../interface/auth.interface';
import { RegitserService } from '../service/register.service';

@Controller('createUser')
export class RegisterController {
  constructor(private usercreateService: RegitserService) {}
  // create user controller
  @Post()
  async createUser(@Res() res: Response, @Body() data: createUser) {
    try {
      await this.usercreateService.createUser(data);
      res.status(201).json({ STATUS_CODES: 201, message: 'user created' });
    } catch (error) {
      res
        .status(409)
        .json({ STATUS_CODES: 409, messgae: 'user already exist' });
    }
  }
}
