import { CreateNotificationBody } from "../dtos/create-notification-body";

import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";

import { NotificationViewModel } from "../view-models/notification-view-model";

import { SendNotification } from "@app/use-cases/send-notification";
import { CancelNotification } from "@app/use-cases/cancel-notification";
import { ReadNotification } from "@app/use-cases/read-notification";
import { UnreadNotification } from "@app/use-cases/unread-notification";
import { CountRecipientNotifications } from "@app/use-cases/count-recipient-notifications";
import { GetRecipientNotifications } from "@app/use-cases/get-recipient-notifications";

@Controller("notifications")
export class NotificationsController {
  constructor(
    private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private readNotification: ReadNotification,
    private unreadNotification: UnreadNotification,
    private countRecipientNotifications: CountRecipientNotifications,
    private getRecipientNotifications: GetRecipientNotifications,
  ) {}

  @Patch("notificaton/:id/cancel")
  async cancel(@Param("id") id: string) {
    await this.cancelNotification.execute({
      notificationId: id,
    });
  }

  @Get("recipient/:id/count")
  async countFromRecipient(@Param("id") id: string) {
    const { count } = await this.countRecipientNotifications.execute({
      recipientId: id,
    });

    return {
      success: true,
      count,
    };
  }

  @Get("recipient/:id")
  async getFromRecipient(@Param("id") id: string) {
    const { notifications } = await this.getRecipientNotifications.execute({
      recipientId: id,
    });

    return {
      success: true,
      notifications: notifications.map((notification) =>
        NotificationViewModel.toHttp(notification),
      ),
    };
  }

  @Patch("notification/:id/read")
  async read(@Param("id") id: string) {
    await this.readNotification.execute({
      notificationId: id,
    });
  }

  @Patch("notification/:id/unread")
  async unread(@Param("id") id: string) {
    await this.unreadNotification.execute({
      notificationId: id,
    });
  }

  @Post()
  async createNotification(@Body() body: CreateNotificationBody) {
    const { content, recipientId, category } = body;

    const { notification } = await this.sendNotification.execute({
      content,
      recipientId,
      category,
    });

    return {
      success: true,
      notification: NotificationViewModel.toHttp(notification),
    };
  }
}
