import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(
    private readonly configService: ConfigService,
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientProxy,
    @Inject('RABBIT_MQ_SERVICE') private readonly rabbitMqClient: ClientProxy,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  kafkaTest(message) {
    return this.kafkaClient.emit(
      this.configService.get('KAFKA_PRODUCTS_TOPIC'),
      message,
    );
  }

  rabbitMqTest(message) {
    return this.rabbitMqClient.emit(
      this.configService.get('RABBIT_MQ_TOPIC'),
      message,
    );
  }
}
