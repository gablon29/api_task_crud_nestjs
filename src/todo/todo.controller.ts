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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './todo.entity';
import { TodoDto } from 'src/Dao/todoDto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilePipe } from 'src/pipes/file.pipe';
import { Response } from 'express';
import { AuthGuard } from 'src/Auth/auth.guard';

@Controller('todo')
export class TodoController {
  constructor(private readonly TodoServices: TodoService) {}

  @Get()
  async findAll(): Promise<Todo[]> {
    return this.TodoServices.getAll();
  }
  // Add the following code to the TodoController class:
  @Post('file')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async creaeteFile(
    @UploadedFile(new FilePipe()) file: Express.Multer.File,
    @Body()
    body: TodoDto,
  ) {
    return this.TodoServices.add(body, file);
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

  @Patch(':id')
  async updateTodo(
    @Body() todo: TodoDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Todo | void> {
    return this.TodoServices.update(id, todo);
  }

  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ): Promise<void> {
    this.TodoServices.delete(id);
    res.status(200).json({ message: 'Todo deleted' });
    return;
  }
}
