import { Injectable } from '@nestjs/common';
import { UserDto } from 'src/Dao/userDto';

@Injectable()
export class UserService {
  getHello(): string {
    return 'Hello user!';
  }

  postUser(user: UserDto): string {
    try {
      return user.name;
    } catch (error) {
      throw new Error('Error parsing user');
    }
  }

  getOne(id: string): string {
    const parsedId = parseInt(id);
    return `Hello getOne! ${parsedId}`;
  }
}
