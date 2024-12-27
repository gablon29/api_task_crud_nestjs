import { Controller, Get } from '@nestjs/common';
import { TodoService } from './tareas.service';
import { TodoDto } from 'src/Dao/todoDto';

@Controller('tarea')
export class TareasController {
  constructor(private readonly TodoService: TodoService) {}
  //  @Get()
  @Get()
  saludoDelServidor(): TodoDto[] {
    return this.TodoService.getTareas();
  }
}
