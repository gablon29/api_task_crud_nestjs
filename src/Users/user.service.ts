import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserDto } from 'src/Dao/userDto';
import * as bcrypt from 'bcryptjs';
import { config as dotenvConfig } from 'dotenv';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/Auth/roles.enum';
import { UserAuthDto } from 'src/Dao/UserAuthDto';

dotenvConfig({ path: '.env' });
const saltRounds = parseInt(process.env.BCRYPT_SALT, 10);

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly jwtService: JwtService,
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
  async createUser(user: UserDto): Promise<{ newUser: User; token: string }> {
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
    const token = this.jwtService.sign({
      sub: newUser.id,
      email: newUser.email,
      roles: [newUser.isAdmin ? Role.ADMIN : Role.USER],
    });
    const userSave = await this.userRepository.save(newUser);
    return {
      newUser: userSave,
      token: token,
    };
  }
  //* Validate user
  async validateUser(userAuthDto: UserAuthDto): Promise<{ token: string }> {
    const { email, password } = userAuthDto;
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = {
      sub: user.id,
      email: user.email,
      roles: [user.isAdmin ? Role.ADMIN : Role.USER],
    };
    const token = this.jwtService.sign(payload);
    return { token };
  }
  //* Update user
  async updateUser(id: string, user: UserDto): Promise<User> {
    const existUser = await this.userRepository.findOne({ where: { id } });
    if (!existUser) {
      throw new NotFoundException('User not found');
    }
    if (user.password) {
      const checkUserPassword = await bcrypt.compare(
        user.password,
        existUser.password,
      );
      if (!checkUserPassword) {
        throw new UnauthorizedException('Password is the same');
      }
      const salt = await bcrypt.genSalt(saltRounds);
      user.password = await bcrypt.hash(user.password, salt);
    }
    Object.assign(existUser, user);
    return await this.userRepository.save(existUser);
  }
  //* Delete user
  async deleteUser(id: string): Promise<void> {
    const result = await this.userRepository.softDelete({ id });
    if (result.affected === 0) {
      throw new NotFoundException('User not found');
    }
  }
}
