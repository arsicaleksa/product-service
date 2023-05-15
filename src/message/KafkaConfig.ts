import {
  ClientProvider,
  ClientsModuleOptionsFactory,
} from '@nestjs/microservices/module/interfaces/clients-module.interface';
import { Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class KafkaConfig implements ClientsModuleOptionsFactory {
  constructor(private readonly configService: ConfigService) {}
  createClientOptions(): Promise<ClientProvider> | ClientProvider {
    return {
      transport: Transport.KAFKA,
      options: {
        producerOnlyMode: true,
        client: {
          clientId: this.configService.get('KAFKA_CLIENT_ID'),
          brokers: this.configService.get('KAFKA_BROKERS').split(','),
        },
      },
    };
  }
}
