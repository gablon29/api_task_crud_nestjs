import { Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { todoProviders } from './todo.providers';
import { TodoService } from './todo.service';

@Module({
  imports: [DataSource],
  providers: [...todoProviders, TodoService],
})
export class TodoModule {}
