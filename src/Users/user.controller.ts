import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from 'src/Dao/userDto';
import { Request, Response } from 'express';
import { AuthGuard } from 'src/Auth/auth.guard';
import { DateAddedInterceptor } from 'src/interceptor/date-added.interceptor';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Get()
  getHello(@Query('name') name?: string): string | Promise<string> {
    if (name) {
      return this.UserService.getUserByName(name);
    }
    return this.UserService.getHello();
  }
  @Post()
  @UseInterceptors(DateAddedInterceptor)
  postUser(@Body() body: UserDto, @Res() res: Response, @Req() request): void {
    console.log(request.now);
    this.UserService.postUser(body);
    res.status(201).send('User created');
  }
  @Get(':id')
  getOne(@Param('id') id: string): string {
    return this.UserService.getOne(id);
  }
}
