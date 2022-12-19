import { Content } from "@app/entities/content";
import { Notification } from "@app/entities/notification";
import { Notification as PrismaNotification } from "@prisma/client";

export class PrismaNotificationMapper {
  static toPrisma(notification: Notification) {
    return {
      id: notification.id,
      content: notification.content.value,
      recipientId: notification.recipientId,
      category: notification.category,
      readAt: notification.readAt,
      createdAt: notification.createdAt,
      canceledAt: notification.canceledAt,
    };
  }

  static toDomain(prismaNotification: PrismaNotification): Notification {
    return new Notification(
      {
        content: new Content(prismaNotification.content),
        recipientId: prismaNotification.recipientId,
        category: prismaNotification.category,
        readAt: prismaNotification.readAt,
        createdAt: prismaNotification.createdAt,
        canceledAt: prismaNotification.canceledAt,
      },
      prismaNotification.id,
    );
  }
}
