import { SendNotification } from "@app/use-cases/send-notification";
import { Controller } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";

@Controller()
export class NotificationController {
  constructor(private sendNotification: SendNotification) {}

  @EventPattern("notification.send-notification")
  async handleSendNotification(@Payload() payload: any) {
    const { category, recipientId, content } = payload;

    console.log("new message");
    console.log(`content: ${content}`);
    console.log(`category: ${category}`);
    console.log(`recipientId: ${recipientId}`);

    this.sendNotification.execute({
      category,
      content,
      recipientId,
    });
  }
}
