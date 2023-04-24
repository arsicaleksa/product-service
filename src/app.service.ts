import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(
    private readonly configService: ConfigService,
    @Inject('PRODUCT_SERVICE') private readonly client: ClientProxy,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  kafkaTest(message) {
    return this.client.emit(
      this.configService.get('MESSAGE_PRODUCTS_TOPIC'),
      message,
    );
  }
}
