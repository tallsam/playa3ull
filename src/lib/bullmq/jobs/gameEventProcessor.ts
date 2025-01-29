import { redisConnection } from "@/lib/redis";
import { Queue, Worker } from "bullmq";
import { defaultQueueConfig } from "../config";
import { GameEvent } from "@/types/gameEvent";

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
    const data: GameEvent[] = job.data;
    // TODO: Save to database

    console.log("Processed order:", data);
  },
  {
    connection: redisConnection,
  }
);

export const addToGameEventProcessorQueue = (data: GameEvent[]) => {
  return processOrderQueue.add(queueName, data);
};
