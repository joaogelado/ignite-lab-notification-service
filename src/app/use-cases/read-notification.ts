import { Injectable } from "@nestjs/common";
import { NotificationsRepository } from "../repositories/notifications-repository";
import { NotificationNotFound } from "./errors/notification-not-fonund";
import { NotificationAlreadyRead } from "./errors/notifications-already-read";

interface ReadNotificationRequest {
  notificationId: string;
}

type ReadNotificationResponse = void;

@Injectable()
export class ReadNotification {
  constructor(private notificationRepository: NotificationsRepository) {}

  async execute(
    request: ReadNotificationRequest,
  ): Promise<ReadNotificationResponse> {
    const { notificationId } = request;

    const notification = await this.notificationRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFound();
    }

    const notificationAlreadyRead = notification.isRead();

    if (notificationAlreadyRead) {
      throw new NotificationAlreadyRead();
    }

    notification.read();

    await this.notificationRepository.save(notification);
  }
}
