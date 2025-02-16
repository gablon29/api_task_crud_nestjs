import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Request, Response } from 'express';
import { User } from './user.entity';
import { UserDto } from 'src/Dao/userDto';
import { DateAddedInterceptor } from 'src/interceptor/date-added.interceptor';
import { AuthGuard } from 'src/Auth/auth.guard';
import { Roles } from 'src/decoretor/roles.decoretor';
import { Role } from 'src/Auth/roles.enum';
import { RolesGuard } from 'src/Auth/role.guard';
import { UserAuthDto } from 'src/Dao/UserAuthDto';

@Controller('user')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Get()
  @UseInterceptors(DateAddedInterceptor)
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  public async getAllUsers(@Res() res: Response): Promise<void> {
    const users: User[] = await this.UserService.getAllUsers();
    res.status(200).json(users);
  }
  @Get('getOne')
  public async getOne(
    @Query('name') username: string,
    @Res() res: Response,
  ): Promise<void> {
    const user = await this.UserService.getUserByName(username);
    res.status(200).json(user);
  }

  @Get('me')
  public async getUserMeAuth0(@Req() req: Request): Promise<string> {
    return JSON.stringify(`User: ${req.oidc.user.email}`);
  }

  @Get('admin')
  // decorador personalizado
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  async getAdmin(@Res() res: Response): Promise<void> {
    res.status(200).json({
      message: 'Admin',
    });
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

  @Get('login')
  async login(
    @Body() userAuthDto: UserAuthDto,
    @Res() res: Response,
  ): Promise<void> {
    const user = await this.UserService.validateUser(userAuthDto);
    res.status(200).json({
      message: user,
    });
  }
}
