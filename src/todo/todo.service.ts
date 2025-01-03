import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TodoDto } from 'src/Dao/todoDto';
import { Todo } from './todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @Inject('TODO_REPOSITORY')
    private todoRepository: Repository<Todo>,
  ) {}

  async findAll(): Promise<Todo[]> {
    return this.todoRepository.find();
  }

  async create(todoDto: TodoDto): Promise<Todo> {
    const todo = this.todoRepository.create(todoDto);
    return this.todoRepository.save(todo);
  }
}
