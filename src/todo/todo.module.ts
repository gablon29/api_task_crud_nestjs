import { Module } from '@nestjs/common';
import { todoProviders } from './todo.providers';
import { TodoService } from './todo.service';
import { DatabaseModule } from 'src/dataBase/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [...todoProviders, TodoService],
})
export class TodoModule {}
