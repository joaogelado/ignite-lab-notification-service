import { Content } from "@app/entities/content";
import { Notification, NotificationData } from "@app/entities/notification";

type Override = Partial<NotificationData>;

export function makeNotification(override: Override = {}): Notification {
  return new Notification({
    recipientId: "recipient-id",
    content: new Content("Hello World"),
    category: "test",

    ...override,
  });
}
