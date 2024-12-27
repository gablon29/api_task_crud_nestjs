import { Module } from '@nestjs/common';
import { TodoService } from './tareas.service';
import { TareasController } from './tareas.controller';
import { TareasRepository } from './tareas.repository';
import { ConfigurationService } from 'src/config/configuration.service';

@Module({
  providers: [TodoService, TareasRepository, ConfigurationService],
  controllers: [TareasController],
})
export class TareasModule {}
