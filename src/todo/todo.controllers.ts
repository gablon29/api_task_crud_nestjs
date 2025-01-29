import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './todo.entity';
import { TodoDto } from 'src/Dao/todoDto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilePipe } from 'src/pipes/file.pipe';

@Controller('todo')
export class TodoController {
  constructor(private readonly TodoServices: TodoService) {}

  @Get()
  async findAll(): Promise<Todo[]> {
    return this.TodoServices.getAll();
  }
  // Add the following code to the TodoController class:
  @Post('file')
  @UseInterceptors(FileInterceptor('image'))
  async creaeteFile(
    @UploadedFile(new FilePipe())
    @Body()
    body: TodoDto,
  ) {
    return this.TodoServices.add(body);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Todo | void> {
    return this.TodoServices.getById(id);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.TodoServices.delete(id);
  }
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: TodoDto,
  ): Promise<Todo | void> {
    return this.TodoServices.update(id, body);
  }
}
