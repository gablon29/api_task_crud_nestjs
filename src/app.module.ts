import { Module } from '@nestjs/common';
import { UserModule } from './Users/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TodoModule } from './todo/todo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeOrmConfig from './config/typeorm';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeOrmConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService], // Inyectamos la clase DatabaseConfig
      useFactory: (configService: ConfigService) =>
        configService.get('typeorm'), // Obtenemos la configuración de TypeORM
    }),
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '1h' },
      secret: process.env.JWT_SECRET,
    }),
    UserModule,
    TodoModule,
  ],
  providers: [],
})
export class AppModule {}
