import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './todo.entity';
import { File } from './file.entity';
import { TodoController } from './todo.controllers';

@Module({
  imports: [TypeOrmModule.forFeature([Todo, File])],
  providers: [TodoService],
  controllers: [TodoController],
})
export class TodoModule {}
