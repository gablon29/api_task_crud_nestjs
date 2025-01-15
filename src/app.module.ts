import { Module } from '@nestjs/common';
import { UserModule } from './Users/user.module';
import { TareasModule } from './Tareas/tareas.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConfigurationService } from './config/configuration.service';
import { TodoModule } from './todo/todo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './Users/user.entity';
import { Todo } from './todo/todo.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService], // Inyectamos la clase DatabaseConfig
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: '', // Agrega el método getDatabasePassword() si es necesario
        database: configService.get('DB_NAME'),
        entities: [User, Todo],
        synchronize: true, // Cambia esto según tu entorno (falso en producción)
      }),
    }),
    UserModule,
    TareasModule,
    TodoModule,
  ],
  providers: [ConfigurationService],
})
export class AppModule {}
