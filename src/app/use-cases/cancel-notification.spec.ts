import { makeNotification } from "@test/factories/make-notification";
import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository";
import { CancelNotification } from "./cancel-notification";
import { NotificationNotFound } from "./errors/notification-not-fonund";
import { NotificationAlreadyCanceled } from "./errors/notifications-already-canceled";
describe("use-cases - Cancel Notification", () => {
  it("should be able to cancel a notification", async () => {
    const notificationRepository = new InMemoryNotificationsRepository();

    const cancelNotification = new CancelNotification(notificationRepository);

    const notification = makeNotification();

    await notificationRepository.create(notification);

    await cancelNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it("should not be able to cancel a non-existing notification", async () => {
    const notificationRepository = new InMemoryNotificationsRepository();

    const cancelNotification = new CancelNotification(notificationRepository);

    expect(() => {
      return cancelNotification.execute({
        notificationId: "fake-id",
      });
    }).rejects.toThrow(NotificationNotFound);
  });

  it("should not be able to read a notification that isn't read", async () => {
    const notificationRepository = new InMemoryNotificationsRepository();

    const cancelNotification = new CancelNotification(notificationRepository);

    const notification = makeNotification();

    await notificationRepository.create(notification);

    await cancelNotification.execute({
      notificationId: notification.id,
    });

    expect(() => {
      return cancelNotification.execute({
        notificationId: notification.id,
      });
    }).rejects.toThrow(NotificationAlreadyCanceled);
  });
});
