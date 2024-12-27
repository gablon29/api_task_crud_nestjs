import { Injectable } from '@nestjs/common';
import { TareasRepository } from './tareas.repository';
import { TodoDto } from 'src/Dao/todoDto';

@Injectable()
export class TodoService {
  constructor(private readonly tareasRepository: TareasRepository) {}

  getTareas(): TodoDto[] {
    return this.tareasRepository.getTareas();
  }
}
