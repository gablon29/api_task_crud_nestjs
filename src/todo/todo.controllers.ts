import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './todo.entity';
import { TodoDto } from 'src/Dao/todoDto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilePipe } from 'src/pipes/file.pipe';
import { Response } from 'express';

@Controller('todo')
export class TodoController {
  constructor(
    private readonly TodoServices: TodoService,
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
  async creaeteFile(
    @UploadedFile(new FilePipe())
    @Body()
    body: TodoDto,
  ) {
    return this.TodoServices.create(body);
  }

  @Patch(':id')
  async updateTodo(
    @Body() todo: TodoDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Todo> {
    return this.TodoServices.updateTodo(id, todo);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number, @Res() res : Response): Promise<void> {
    this.TodoServices.delete(id);
    res.status(200).json({message: 'Todo deleted'});
    return;
  }
}
