import { Body, Controller, Get, Post } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './todo.entity';
import { TodoDto } from 'src/Dao/todoDto';

@Controller('todo')
export class TodoController {
  constructor(private readonly TodoServices: TodoService) {}

  @Get()
  async findAll(): Promise<Todo[]> {
    return this.TodoServices.findAll();
  }

  @Post()
  async createTodo(@Body() todo: TodoDto): Promise<Todo> {
    return this.TodoServices.create(todo);
  }
}
