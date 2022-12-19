import { makeNotification } from "@test/factories/make-notification";
import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository";
import { NotificationNotFound } from "./errors/notification-not-fonund";
import { NotificationNotRead } from "./errors/notification-not-read";
import { UnreadNotification } from "./unread-notification";
describe("use-cases - Cancel Notification", () => {
  it("should be able to cancel a notification", async () => {
    const notificationRepository = new InMemoryNotificationsRepository();

    const unreadNotification = new UnreadNotification(notificationRepository);

    const notification = makeNotification({
      readAt: new Date(),
    });

    await notificationRepository.create(notification);

    await unreadNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationRepository.notifications[0].readAt).toBeNull();
  });

  it("should not be able to cancel a non-existing notification", async () => {
    const notificationRepository = new InMemoryNotificationsRepository();

    const unreadNotification = new UnreadNotification(notificationRepository);

    expect(() => {
      return unreadNotification.execute({
        notificationId: "fake-id",
      });
    }).rejects.toThrow(NotificationNotFound);
  });

  it("should not be able to read a notification that isn't read", async () => {
    const notificationRepository = new InMemoryNotificationsRepository();

    const unreadNotification = new UnreadNotification(notificationRepository);

    const notification = makeNotification();

    await notificationRepository.create(notification);

    expect(() => {
      return unreadNotification.execute({
        notificationId: notification.id,
      });
    }).rejects.toThrow(NotificationNotRead);
  });
});
