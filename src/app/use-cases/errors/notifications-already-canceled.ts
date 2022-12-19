export class NotificationAlreadyCanceled extends Error {
  constructor() {
    super("Notification was already canceled");
  }
}
