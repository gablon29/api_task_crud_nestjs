import {
  IsString,
  IsNotEmpty,
  IsStrongPassword,
  IsEmail,
  IsEmpty,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsEmail()
  email: string;
  @IsStrongPassword()
  password: string;
  @IsBoolean()
  @IsOptional()
  isAdmin: boolean;
  @IsOptional()
  todo?: number;
}
