import { redisConnection } from "@/lib/redis";
import { Job, Queue, Worker } from "bullmq";
import { defaultQueueConfig } from "../config";
import { GameEvent } from "@/types/gameEvent";
import { prisma } from "@/lib/prisma/prisma";

const queueName = "gameEventProcessor";

export const processOrderQueue = new Queue(queueName, {
  connection: redisConnection,
  defaultJobOptions: {
    ...defaultQueueConfig,
    delay: 500,
  },
});

export const worker = new Worker(
  queueName,
  async (job) => {
    const events: GameEvent[] = job.data;

    await processGameEvents(events);

    console.log("Processed events:", events);
  },
  {
    connection: redisConnection,
  }
);

worker.on("failed", (job: Job | undefined, error: Error) => {
  console.error(
    `Job ${job?.id} failed permanently after ${job?.attemptsMade} attempts:`,
    error.message
  );
});

export async function processGameEvents(events: GameEvent[]) {
  try {
    await prisma.gameEvent.createMany({ data: events, skipDuplicates: true });
  } catch (error) {
    console.error("Error processing events:", error);
    throw error;
  }
}

export const addToGameEventProcessorQueue = (data: GameEvent[]) => {
  return processOrderQueue.add(queueName, data);
};
