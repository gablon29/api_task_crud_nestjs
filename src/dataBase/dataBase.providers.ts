import { DataSource } from 'typeorm';
import { DatabaseConfig } from './database.config'; // Ajusta la ruta según tu estructura

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    inject: [DatabaseConfig], // Inyectamos la clase DatabaseConfig
    useFactory: async (databaseConfig: DatabaseConfig) => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: databaseConfig.getDatabaseHost(),
        port: databaseConfig.getDatabasePort(),
        username: databaseConfig.getDatabaseUsername(),
        password: '', // Agrega el método getDatabasePassword() si es necesario
        database: databaseConfig.getDatabaseName(),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true, // Cambia esto según tu entorno (falso en producción)
      });
      return dataSource.initialize();
    },
  },
];
