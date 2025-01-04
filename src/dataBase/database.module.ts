import { Module } from '@nestjs/common';
import { databaseProviders } from './dataBase.providers';
import { ConfigModule } from '@nestjs/config';
import { DatabaseConfig } from './database.config';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [...databaseProviders, DatabaseConfig],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
