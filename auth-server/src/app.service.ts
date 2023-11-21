import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'NestJS API JWT Authentication with Refresh Tokens 1';
  }
}
