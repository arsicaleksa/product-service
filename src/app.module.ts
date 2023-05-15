import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';
import { KafkaConfig } from './message/KafkaConfig';
import { RabbitMqConfig } from './message/RabbitMqConfig';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'KAFKA_SERVICE',
        useClass: KafkaConfig,
        imports: [ConfigModule],
      },
      {
        name: 'RABBIT_MQ_SERVICE',
        useClass: RabbitMqConfig,
        imports: [ConfigModule],
      },
    ]),
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
