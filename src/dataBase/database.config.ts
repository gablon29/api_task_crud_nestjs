import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseConfig {
  constructor(private configService: ConfigService) {}

  getDatabaseHost(): string {
    return this.configService.get<string>('DB_HOST');
  }
  getDatabasePort(): number {
    return this.configService.get<number>('DB_PORT');
  }
  getDatabaseName(): string {
    return this.configService.get<string>('DB_NAME');
  }
  getDatabaseUsername(): string {
    return this.configService.get<string>('DB_USER');
  }
}
