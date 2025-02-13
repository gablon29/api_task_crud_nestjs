import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { TodoDto } from 'src/Dao/todoDto';
import { Todo } from './todo.entity';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { File } from './file.entity';
import { ITodoService } from './ITodoService.service';

@Injectable()
export class TodoService implements ITodoService {
  constructor(
    private cloudinaryService: CloudinaryService,
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
    @InjectRepository(File)
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async getAll(): Promise<Todo[]> {
    return this.todoRepository.find();
  }

  async add(todoDto: TodoDto, file: Express.Multer.File): Promise<Todo> {
    if (file) {
      await this.dataSource.manager
        .transaction(async (manager: EntityManager) => {
          const fileCreated = await this.cloudinaryService.uploadImage(file);
          const fileRegister: File = await manager.save(File, {
            name: fileCreated.original_filename,
            data_url: fileCreated.url,
          });
          const todo = manager.create(Todo, {
            ...todoDto,
            files: [fileRegister],
          });
          await manager.save(Todo, todo);
        })
        .catch((error) => {
          throw new BadRequestException(error);
        });
      return this.todoRepository.findOne({
        where: { title: todoDto.title },
        relations: ['files'],
      });
    } else {
      const todo = this.todoRepository.create(todoDto);
      const todoRegister = await this.todoRepository.save(todo);
      return todoRegister;
    }
  }
  async delete(id: number): Promise<void> {
    this.todoRepository.delete(id);
  }

  async update(id: number, todoDto: TodoDto): Promise<Todo | void> {
    const todo = await this.todoRepository.findOne({ where: { id } });
    if (!todo) {
      throw new NotFoundException('Todo not found');
    }
    const todoUpdated = { ...todo, ...todoDto };
    await this.todoRepository.save(todoUpdated);
  }

  async getById(id: number): Promise<Todo | void> {
    const todo = await this.todoRepository.findOne({ where: { id } });
    if (!todo) {
      throw new NotFoundException('Todo not found');
    }
    return todo;
  }
}
