import { IsString, Length } from 'class-validator';

export class TodoDto {
  @IsString()
  @Length(1, 20)
  title: string;
  @IsString()
  @Length(1, 100)
  description: string;
}
