import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserDto } from 'src/Dao/userDto';
import * as bcrypt from 'bcrypt';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: '.env' });
const saltRounds = parseInt(process.env.BCRYPT_SALT, 10);

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  //* Get all users
  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }
  //* Get user
  async getUserByName(name: string): Promise<User> {
    return await this.userRepository.findOne({ where: { name } });
  }
  //* Create a new user
  async createUser(user: UserDto): Promise<User> {
    const checkUser = await this.userRepository.findOne({
      where: { name: user.name },
    });
    if (checkUser) {
      throw new ConflictException('User already exists');
    }
    const salt = await bcrypt.genSalt(saltRounds);
    const codignPass = await bcrypt.hash(user.password, salt);
    const newUser = this.userRepository.create({
      ...user,
      password: codignPass,
    });
    return await this.userRepository.save(newUser);
  }
  //* Validate user
  async validateUser(name: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { name } });
    if (user) {
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (isPasswordMatch) {
        return user;
      }
    }
    return null;
  }
  //* Update user
  async updateUser(id: string, user: UserDto): Promise<User> {
    const salt = await bcrypt.genSalt(saltRounds);
    const codignPass = await bcrypt.hash(user.password, salt);
    const existUser = await this.userRepository.findOne({ where: { id } });
    if (!existUser) {
      throw new NotFoundException('User not found');
    }

    const userUpdated = {
      ...existUser,
      ...user,
      password: codignPass,
    };
    return await this.userRepository.save(userUpdated);
  }
  //* Delete user
  async deleteUser(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
