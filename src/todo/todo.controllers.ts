import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './todo.entity';
import { TodoDto } from 'src/Dao/todoDto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Controller('todo')
export class TodoController {
  constructor(
    private readonly TodoServices: TodoService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Get()
  async findAll(): Promise<Todo[]> {
    return this.TodoServices.findAll();
  }

  @Post()
  async createTodo(@Body() todo: TodoDto): Promise<Todo> {
    return this.TodoServices.create(todo);
  }
  // para la subida de archivos
  @Post('file')
  @UseInterceptors(FileInterceptor('image'))
  async creaeteFile(@UploadedFile() file: Express.Multer.File) {
    const imageUrl = await this.cloudinaryService.uploadImage(file);
    return imageUrl.url;
  }
}
