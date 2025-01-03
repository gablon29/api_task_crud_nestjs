import { DataSource } from 'typeorm';
import 'dotenv/config';
import { DatabaseConfig } from './database.config';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    inject: [DatabaseConfig],
    useFactory: async (databaseConfig: DatabaseConfig) => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: databaseConfig.getDatabaseHost(),
        port: databaseConfig.getDatabasePort(),
        username: databaseConfig.getDatabaseUsername(),
        password: '',
        database: databaseConfig.getDatabaseName(),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
