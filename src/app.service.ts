import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  getDatabaseUrl(): string {
    const databaseUrl = this.configService.get<string>('databaseUrl');
    return databaseUrl;
  }

  getPort(): number {
    const port = this.configService.get<number>('port');
    return port;
  }
  getHello(): string {
    return 'Hello World!';
  }
}
