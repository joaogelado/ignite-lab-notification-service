import { PrismaNotificationMapper } from "@infra/database/mappers/prisma-notification-mapper";
import { Injectable } from "@nestjs/common";
import { Notification } from "@app/entities/notification";
import { NotificationsRepository } from "@app/repositories/notifications-repository";
import { PrismaService } from "../prisma.service";

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async countManyByRecipientId(recipientId: string): Promise<number> {
    const count = await this.prismaService.notification.count({
      where: {
        recipientId,
      },
    });

    return count;
  }

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    const notifications = await this.prismaService.notification.findMany({
      where: {
        recipientId,
      },
    });

    return notifications.map((notification) =>
      PrismaNotificationMapper.toDomain(notification),
    );
  }

  async findById(notificationId: string): Promise<Notification | null> {
    const notification = await this.prismaService.notification.findUnique({
      where: {
        id: notificationId,
      },
    });

    if (!notification) {
      return null;
    }

    return PrismaNotificationMapper.toDomain(notification);
  }

  async create(rawNotification: Notification): Promise<void> {
    const notification = PrismaNotificationMapper.toPrisma(rawNotification);

    await this.prismaService.notification.create({
      data: notification,
    });
  }

  async save(rawNotification: Notification): Promise<void> {
    const notification = PrismaNotificationMapper.toPrisma(rawNotification);

    await this.prismaService.notification.update({
      where: {
        id: notification.id,
      },
      data: notification,
    });
  }
}
