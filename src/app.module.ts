import { Module } from '@nestjs/common';
import { UserModule } from './Users/user.module';
import { TareasModule } from './Tareas/tareas.module';

@Module({
  imports: [UserModule, TareasModule],
})
export class AppModule {}
