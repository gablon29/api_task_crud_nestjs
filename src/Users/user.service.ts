import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  getHello(): string {
    return 'Hello user!';
  }

  async getUserByName(name: string): Promise<string> {
    return `Hello ${name}`;
  }

  getOne(id: string): string {
    const parsedId = parseInt(id);
    return `Hello getOne! ${parsedId}`;
  }
}
