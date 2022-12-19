export class NotificationNotRead extends Error {
  constructor() {
    super("Notification was not read");
  }
}
