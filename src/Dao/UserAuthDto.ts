import { PickType } from '@nestjs/swagger';
import { UserDto } from 'src/Dao/userDto';

export class UserAuthDto extends PickType(UserDto, ['email', 'password']) {
  email: string;
  password: string;
}
