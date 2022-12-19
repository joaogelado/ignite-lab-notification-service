export class NotificationAlreadyRead extends Error {
  constructor() {
    super("Notification was already read");
  }
}
