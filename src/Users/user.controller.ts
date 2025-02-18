import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
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
import { ApiResponse } from 'src/response/ApiResponse';

@Controller('user')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Get()
  @UseInterceptors(DateAddedInterceptor)
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  public async getAllUsers(): Promise<ApiResponse<User[]>> {
    const users: User[] = await this.UserService.getAllUsers();
    if (!users.length) {
      throw new HttpException('Users not found', HttpStatus.NOT_FOUND);
    }
    return new ApiResponse<User[]>(HttpStatus.OK, true, 'Users found', users);
  }

  @Get('getOne')
  public async getOne(
    @Query('name') username: string,
  ): Promise<ApiResponse<User>> {
    const user = await this.UserService.getUserByName(username);
    if (!user) {
      throw new HttpException("User doesn't exist", HttpStatus.NOT_FOUND);
    }
    return new ApiResponse<User>(HttpStatus.OK, true, 'User found', user);
  }

  @Get('me')
  public async getUserMeAuth0(
    @Req() req: Request,
  ): Promise<ApiResponse<string>> {
    return new ApiResponse(
      HttpStatus.OK,
      true,
      JSON.stringify(`User: ${req.oidc.user.email}`),
      null,
    );
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
  async createUser(@Body() user: UserDto): Promise<ApiResponse<string>> {
    try {
      const userRegister = await this.UserService.createUser(user);
      return new ApiResponse<string>(
        HttpStatus.CREATED,
        true,
        'User created',
        userRegister.token,
      );
    } catch (error) {
      throw new HttpException("User doesn't exist", HttpStatus.NOT_FOUND);
    }
  }
  @Patch('update')
  async updateUser(
    @Query('id') id: string,
    @Body() user: UserDto,
  ): Promise<ApiResponse<User>> {
    try {
      const userUpdated = await this.UserService.updateUser(id, user);
      return new ApiResponse<User>(
        HttpStatus.OK,
        true,
        'User updated',
        userUpdated,
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Get('login')
  async login(@Body() userAuthDto: UserAuthDto): Promise<ApiResponse<string>> {
    try {
      const user = await this.UserService.validateUser(userAuthDto);
      return new ApiResponse<string>(
        HttpStatus.ACCEPTED,
        true,
        'User logged',
        user.token,
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }
}
