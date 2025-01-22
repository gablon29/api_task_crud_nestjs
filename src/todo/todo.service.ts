import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TodoDto } from 'src/Dao/todoDto';
import { Todo } from './todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from './file.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
    @InjectRepository(File)
    private fileRepository: Repository<File>,
  ) {}

  async findAll(): Promise<Todo[]> {
    return this.todoRepository.find();
  }

  async create(todoDto: TodoDto): Promise<Todo> {
    const todo = this.todoRepository.create(todoDto);
    return this.todoRepository.save(todo);
  }
  // para la subida de archivos
  async createFile(file: any): Promise<void> {
    return file;
  }
}
