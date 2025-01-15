import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getUserByName(name: string): Promise<User> {
    return await this.userRepository.findOne({ where: { name } });
  }

  getOne(id: string): string {
    const parsedId = parseInt(id);
    return `Hello getOne! ${parsedId}`;
  }
}
