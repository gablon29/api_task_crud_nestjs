import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSource, EntityManager, Repository } from 'typeorm';
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
    this.dataSource
      .transaction(async (manager: EntityManager) => {
        const fileCreated = await this.cloudinaryService.uploadImage(
          todoDto.file,
        );
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
    return this.todoRepository.findOne({ where: { title: todoDto.title } });
  }
}
