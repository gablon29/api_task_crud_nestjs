import { Todo } from './todo.entity';
import { TodoDto } from 'src/Dao/todoDto';

export interface ITodoService {
  add(todoDto: TodoDto, file: Express.Multer.File): void;
  delete(id: number): Promise<void>;
  getAll(): Promise<Todo[]>;
  getById(todoId: number): Promise<Todo | void>;
  update(todoId: number, todoDto: TodoDto): Promise<Todo | void>;
}
