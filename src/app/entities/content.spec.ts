import { Content } from "./content";

describe("Content", () => {
  it("should be able to create a content", () => {
    const content = new Content("Hello World");
    expect(content).toBeTruthy();

    expect(content.value).toBe("Hello World");
  });

  it("should not be able to create a content with less than 5 characters", () => {
    expect(() => new Content("Hi")).toThrow();
  });

  it("should not be able to create a content with more than 255 characters", () => {
    expect(() => new Content("A".repeat(256))).toThrow();
  });
});
