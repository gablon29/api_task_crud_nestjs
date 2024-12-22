import { Controller, Get } from '@nestjs/common';
import { TodoService } from './tareas.service';

@Controller('tarea')
export class TareasController {
  constructor(private readonly TodoService: TodoService) {}
  //  @Get()
  @Get()
  saludoDelServidor(): string {
    return this.TodoService.getHello();
  }
}
