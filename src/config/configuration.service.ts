import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ConfigurationService {
  constructor(private configService: ConfigService) {}

  getaccessToken(): string {
    return this.configService.get<string>('TOKEN');
  }
  getDatabaseHost(): string {
    return this.configService.get<string>('DB_HOST');
  }
  getDatabasePort(): number {
    return this.configService.get<number>('DB_PORT');
  }
  getDatabaseName(): string {
    return this.configService.get<string>('DB_NAME');
  }
  getDatabaseUser(): string {
    return this.configService.get<string>('DB_USER');
  }
}
