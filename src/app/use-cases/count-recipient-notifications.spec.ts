import { Content } from "@app/entities/content";
import { makeNotification } from "@test/factories/make-notification";
import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository";
import { CountRecipientNotifications } from "./count-recipient-notifications";

describe("use-cases - Count Recipient Notifications", () => {
  it("should be able to count all notifications from a recipientId", async () => {
    const notificationRepository = new InMemoryNotificationsRepository();

    const countRecipientNotifications = new CountRecipientNotifications(
      notificationRepository,
    );

    await notificationRepository.create(
      makeNotification({
        recipientId: "recipient-1",
      }),
    );

    await notificationRepository.create(
      makeNotification({
        recipientId: "recipient-2",
      }),
    );

    await notificationRepository.create(
      makeNotification({
        recipientId: "recipient-2",
      }),
    );

    const countOfRecipient1 = await countRecipientNotifications.execute({
      recipientId: "recipient-1",
    });

    const countOfRecipient2 = await countRecipientNotifications.execute({
      recipientId: "recipient-2",
    });

    expect(countOfRecipient1.count).toEqual(1);
    expect(countOfRecipient2.count).toEqual(2);
  });
});
