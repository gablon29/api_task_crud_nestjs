import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './todo.entity';
import { File } from './file.entity';
import { TodoController } from './todo.controller';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { AuthService } from 'src/Auth/auth.service';
import { requiresAuth } from 'express-openid-connect';

@Module({
  imports: [TypeOrmModule.forFeature([Todo, File]), CloudinaryModule],
  providers: [TodoService, AuthService],
  controllers: [TodoController],
})
export class TodoModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(requiresAuth()).forRoutes(TodoController);
  }
}
