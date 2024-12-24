import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from 'src/Dao/userDto';

@Controller('user')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Get()
  getHello(): string {
    return this.UserService.getHello();
  }
  @Post()
  postUser(@Body() body: UserDto): string {
    return this.UserService.postUser(body);
  }
  @Get(':id')
  getOne(@Param('id') id: string): string {
    return this.UserService.getOne(id);
  }
}
