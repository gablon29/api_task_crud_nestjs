import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Query,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';
import { User } from './user.entity';
import { UserDto } from 'src/Dao/userDto';
import { DateAddedInterceptor } from 'src/interceptor/date-added.interceptor';
import { AuthGuard } from 'src/Auth/auth.guard';
import { Role } from 'src/decoretor/roles.decoretor';
import { Roles } from 'src/Auth/roles.enum';
import { RolesGuard } from 'src/Auth/role.guard';

@Controller('user')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Get()
  @UseGuards(AuthGuard)
  @UseInterceptors(DateAddedInterceptor)
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

  @Get('admin')
  // decorador personalizado
  @Role(Roles.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  getAdmin(): string {
    return 'Admin';
  }
  @Post()
  async createUser(@Res() res: Response, @Body() user: UserDto): Promise<void> {
    const userRegister = await this.UserService.createUser(user);
    res.status(201).json({
      message: 'User created',
      user: userRegister,
    });
  }
  @Patch('update')
  async updateUser(
    @Query('id') id: string,
    @Body() user: UserDto,
    @Res() res: Response,
  ): Promise<void> {
    const userUpdated = await this.UserService.updateUser(id, user);
    res.status(200).json(userUpdated);
  }
}
