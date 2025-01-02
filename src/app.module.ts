import { Module } from '@nestjs/common';
import { UserModule } from './Users/user.module';
import { TareasModule } from './Tareas/tareas.module';
import { ConfigModule } from '@nestjs/config';
import { ConfigurationService } from './config/configuration.service';
import config from './config/config';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    TodoModule,
    UserModule,
    TareasModule,
  ],
  providers: [ConfigurationService],
})
export class AppModule {}
