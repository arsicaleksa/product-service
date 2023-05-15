import {
  ClientProvider,
  ClientsModuleOptionsFactory,
} from '@nestjs/microservices/module/interfaces/clients-module.interface';
import { Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RabbitMqConfig implements ClientsModuleOptionsFactory {
  constructor(private readonly configService: ConfigService) {}
  createClientOptions(): Promise<ClientProvider> | ClientProvider {
    return {
      transport: Transport.RMQ,
      options: {
        urls: this.configService.get('RABBIT_MQ_URLS').split(','),
        queue: this.configService.get('RABBIT_MQ_QUEUE'),
        queueOptions: {
          durable: true,
        },
      },
    };
  }
}
