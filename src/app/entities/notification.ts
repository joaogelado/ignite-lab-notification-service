import { randomUUID } from "node:crypto";
import { Replace } from "@helpers/Replace";
import { Content } from "./content";

export interface NotificationData {
  content: Content;
  category: string;
  readAt?: Date | null;
  createdAt: Date;
  recipientId: string;
  canceledAt?: Date | null;
}

export class Notification {
  private _id: string;
  private data: NotificationData;

  constructor(
    data: Replace<
      NotificationData,
      {
        createdAt?: Date;
      }
    >,

    id?: string,
  ) {
    this.data = {
      ...data,
      createdAt: data.createdAt ?? new Date(),
    };
    this._id = id ?? randomUUID();
  }

  public get content(): Content {
    return this.data.content;
  }

  public set content(value: Content) {
    this.data.content = value;
  }

  public get recipientId(): string {
    return this.data.recipientId;
  }

  public set recipientId(value: string) {
    this.data.recipientId = value;
  }

  public get readAt(): Date | null | undefined {
    return this.data.readAt;
  }

  public read(): void {
    this.data.readAt = new Date();
  }

  public unread(): void {
    this.data.readAt = null;
  }

  public isRead(): boolean {
    return !!this.data.readAt;
  }

  public get category(): string {
    return this.data.category;
  }

  public set category(value: string) {
    this.data.category = value;
  }

  public get createdAt(): Date {
    return this.data.createdAt;
  }

  public get canceledAt(): Date | null | undefined {
    return this.data.canceledAt;
  }

  public cancel(): void {
    this.data.canceledAt = new Date();
  }

  public isCanceled(): boolean {
    return !!this.data.canceledAt;
  }

  public get id(): string {
    return this._id;
  }
}
