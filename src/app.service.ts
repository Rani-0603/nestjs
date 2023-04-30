import { Injectable, OnModuleInit } from '@nestjs/common';

/**
 * App Service class
 */
@Injectable()
export class AppService implements OnModuleInit {
  onModuleInit() {
    console.log('Appservice on moduleInit.');
  }

  /**
   * print default msg
   */
  getHello(): string {
    return 'Hello World!...';
  }
}
