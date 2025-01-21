import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './todo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Todo, File])],
  providers: [TodoService],
})
export class TodoModule {}
