import { Module } from '@nestjs/common';
import { databaseProviders } from './dataBase.providers';
import { ConfigurationService } from 'src/config/configuration.service';

@Module({
  providers: [...databaseProviders, ConfigurationService],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
