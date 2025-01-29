import { redisConnection } from "@/lib/redis";
import { Queue, Worker } from "bullmq";
import { defaultQueueConfig } from "../config";
import { GameEvent } from "@/types/gameEvent";
import { prisma } from "@/lib/prisma/prisma";

const queueName = "gameEventProcessor";

const processOrderQueue = new Queue(queueName, {
  connection: redisConnection,
  defaultJobOptions: {
    ...defaultQueueConfig,
    delay: 500,
  },
});

new Worker(
  queueName,
  async (job) => {
    const events: GameEvent[] = job.data;
    console.log("job", events);
    try {
      await prisma.$transaction(async (tx: any) => {
        await tx.gameEvent.createMany({ data: events });
      });
    } catch (error) {
      console.error("Error processing events:", error);
      return false;
    }

    console.log("Processed events:", events);
  },
  {
    connection: redisConnection,
  }
);

export const addToGameEventProcessorQueue = (data: GameEvent[]) => {
  return processOrderQueue.add(queueName, data);
};
