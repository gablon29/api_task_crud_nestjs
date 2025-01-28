import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { TodoDto } from 'src/Dao/todoDto';
import { Todo } from './todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { File } from './file.entity';

@Injectable()
export class TodoService {
  constructor(
    private cloudinaryService: CloudinaryService,
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
    private dataSource: DataSource,
  ) {}

  async findAll(): Promise<Todo[]> {
    return this.todoRepository.find();
  }

  async create(todoDto: TodoDto): Promise<Todo> {
    const todo = this.todoRepository.create(todoDto);
    return this.todoRepository.save(todo);
  }
  // para la subida de archivos
  async createFile(file: Express.Multer.File) {
    return this.cloudinaryService.uploadImage(file).catch((error) => {
      throw new BadRequestException(error);
    });
  }
}
