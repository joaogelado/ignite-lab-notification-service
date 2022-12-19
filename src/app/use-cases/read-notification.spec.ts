import { makeNotification } from "@test/factories/make-notification";
import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository";
import { NotificationNotFound } from "./errors/notification-not-fonund";
import { NotificationAlreadyRead } from "./errors/notifications-already-read";
import { ReadNotification } from "./read-notification";
describe("use-cases - Read Notification", () => {
  it("should be able to read a notification", async () => {
    const notificationRepository = new InMemoryNotificationsRepository();

    const readNotification = new ReadNotification(notificationRepository);

    const notification = makeNotification();

    await notificationRepository.create(notification);

    await readNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationRepository.notifications[0].readAt).toEqual(
      expect.any(Date),
    );
  });

  it("should not be able to cancel a non-existing notification", async () => {
    const notificationRepository = new InMemoryNotificationsRepository();

    const readNotification = new ReadNotification(notificationRepository);

    expect(() => {
      return readNotification.execute({
        notificationId: "fake-id",
      });
    }).rejects.toThrow(NotificationNotFound);
  });

  it("should not be able to reread a notification", async () => {
    const notificationRepository = new InMemoryNotificationsRepository();

    const readNotification = new ReadNotification(notificationRepository);

    const notification = makeNotification();

    await notificationRepository.create(notification);

    readNotification.execute({
      notificationId: notification.id,
    });

    expect(() => {
      return readNotification.execute({
        notificationId: notification.id,
      });
    }).rejects.toThrow(NotificationAlreadyRead);
  });
});
