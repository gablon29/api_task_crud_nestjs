import { Module } from '@nestjs/common';
import { TodoService } from './tareas.service';
import { TareasController } from './tareas.controller';

@Module({
  providers: [TodoService],
  controllers: [TareasController],
})
export class TareasModule {}
