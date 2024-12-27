import { Inject, Injectable } from '@nestjs/common';
import { TareasRepository } from './tareas.repository';
import { TodoDto } from 'src/Dao/todoDto';
import { ConfigurationService } from 'src/config/configuration.service';

@Injectable()
export class TodoService {
  constructor(
    private readonly tareasRepository: TareasRepository,
    private configService: ConfigurationService,
  ) {}

  getTareas(): TodoDto[] | string {
    return this.configService.getaccessToken() === 'HOLA'
      ? this.tareasRepository.getTareas()
      : 'No autorizado';
  }
}
