import { Injectable, OnModuleDestroy } from "@nestjs/common";
import { ServerKafka } from "@nestjs/microservices";
import { logLevel } from "@nestjs/microservices/external/kafka.interface";

@Injectable()
export class KafkaService extends ServerKafka implements OnModuleDestroy {
  constructor() {
    super({
      client: {
        clientId: "notification-service",
        brokers: ["localhost:29092"],
        logLevel: logLevel.DEBUG,
      },
    });
  }

  onModuleDestroy() {
    this.close();
  }
}
