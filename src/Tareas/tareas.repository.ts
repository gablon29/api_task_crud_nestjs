import { Injectable } from '@nestjs/common';
import { TodoDto } from 'src/Dao/todoDto';

@Injectable()
export class TareasRepository {
  private tareas: TodoDto[] = [
    {
      title: 'Tarea 1',
      description: 'Descripcion de la tarea 1',
    },
    {
      title: 'Tarea 2',
      description: 'Descripcion de la tarea 2',
    },
    {
      title: 'Tarea 3',
      description: 'Descripcion de la tarea 3',
    },
  ];

  getTareas(): TodoDto[] {
    return this.tareas;
  }
}
