import { Content } from "./content";
import { Notification } from "./notification";

describe("Notification", () => {
  it("should be able to create a notification", () => {
    const content = new Notification({
      content: new Content("Hello World"),
      category: "test",
      createdAt: new Date(),
      recipientId: "123",
    });

    expect(content).toBeTruthy();
    expect(content.content.value).toBe("Hello World");
    expect(content.category).toBe("test");
    expect(content.createdAt).toBeTruthy();
    expect(content.recipientId).toBe("123");
  });

  it("should be able to create a notification without a date", () => {
    const content = new Notification({
      content: new Content("Hello World"),
      category: "test",
      recipientId: "123",
    });

    expect(content).toBeTruthy();
  });
});
