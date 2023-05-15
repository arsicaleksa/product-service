import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { randomUUID } from 'crypto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('kafka-produce')
  kafkaProduce() {
    const uuid = randomUUID();
    const message = {
      id: uuid,
      name: 'Nike Patike',
      category: 'Patike',
      brand: 'Nike',
      description: 'Nike patike - nema boljih',
    };

    return this.appService.kafkaTest(message);
  }

  @Get('rabbit-mq-produce')
  rabbitMqProduce() {
    const uuid = randomUUID();
    const message = {
      id: uuid,
      name: 'Rabbit Patike',
      category: 'RABBIT MQ',
      brand: 'RABBIT',
      description: 'Rabbit patike - nema boljih',
    };

    return this.appService.rabbitMqTest(message);
  }
}
