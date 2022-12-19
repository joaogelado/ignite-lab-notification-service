import { randomUUID } from "node:crypto";
import { Kafka } from "kafkajs";

async function bootstrap() {
  console.log("starting");

  const kafka = new Kafka({
    brokers: ["localhost:29092"],
  });

  const producer = kafka.producer();

  await producer.connect();

  await producer.send({
    messages: [
      {
        value: JSON.stringify({
          recipientId: randomUUID(),
          content: "Você tem uma nova solicitação de amizade.",
          category: "social/new-friend",
        }),
      },
    ],
    topic: "notification.send-notification",
  });

  await producer.disconnect();

  console.log("done");
}

bootstrap();
