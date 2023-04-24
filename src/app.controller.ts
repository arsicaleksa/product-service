import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientKafka } from '@nestjs/microservices';
import { randomUUID } from 'crypto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('PRODUCT_SERVICE') private readonly client: ClientKafka,
  ) {}

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
      description: 'Nike patike za seljake i poljoprivrednike',
    };

    return this.appService.kafkaTest(message);
  }
}
