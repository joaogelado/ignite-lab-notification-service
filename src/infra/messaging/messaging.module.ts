import { KafkaService } from "./kafka/consumer/kafka.consumer.service";
import { Module } from "@nestjs/common";
import { NotificationController } from "./kafka/consumer/controllers/notification.controller";
import { DatabaseModule } from "@infra/database/database.module";
import { SendNotification } from "@app/use-cases/send-notification";

@Module({
  imports: [DatabaseModule],
  providers: [KafkaService, SendNotification],
  controllers: [NotificationController],
})
export class MessagingModule {}
