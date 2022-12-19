import { GetRecipientNotifications } from "./get-recipient-notifications";
import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository";
import { makeNotification } from "@test/factories/make-notification";

describe("use-cases - Get Recipient Notifications", () => {
  it("should be able to get all notifications from a recipientId", async () => {
    const notificationRepository = new InMemoryNotificationsRepository();

    const getRecipientNotifications = new GetRecipientNotifications(
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

    const { notifications } = await getRecipientNotifications.execute({
      recipientId: "recipient-2",
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          recipientId: "recipient-2",
        }),
        expect.objectContaining({
          recipientId: "recipient-2",
        }),
      ]),
    );
  });
});
