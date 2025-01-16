import { Controller, Get, Query, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/Auth/auth.guard';
import { Response } from 'express';
import { User } from './user.entity';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Get()
  async getAllUsers(@Res() res: Response): Promise<void> {
    const users: User[] = await this.UserService.getAllUsers();
    res.status(200).json(users);
  }
  @Get('getOne')
  async getOne(
    @Query('name') username: string,
    @Res() res: Response,
  ): Promise<void> {
    const user = await this.UserService.getUserByName(username);
    res.status(200).json(user);
  }
}
