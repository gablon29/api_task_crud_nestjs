import { Controller, Get } from '@nestjs/common';
import { TodoService } from './tareas.service';
import { TodoDto } from 'src/Dao/todoDto';
import { ConfigurationService } from 'src/config/configuration.service';

@Controller('tareas')
export class TareasController {
  constructor(private readonly TodoService: TodoService) {}
  //  @Get()
  @Get()
  getTareas(): TodoDto[] | string {
    return this.TodoService.getTareas();
  }
}
