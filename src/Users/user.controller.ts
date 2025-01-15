import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/Auth/auth.guard';

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
  @Get(':id')
  getOne(@Param('id') id: string): string {
    return this.UserService.getOne(id);
  }
}
