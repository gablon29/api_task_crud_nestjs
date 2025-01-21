import { Module } from '@nestjs/common';
import { TodoService } from './tareas.service';
import { TareasController } from './tareas.controller';
import { TareasRepository } from './tareas.repository';

@Module({
  providers: [TodoService, TareasRepository],
  controllers: [TareasController],
})
export class TareasModule {}
