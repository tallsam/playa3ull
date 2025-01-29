import Redis from 'ioredis';
 
const host = process.env.REDIS_HOST;

const port = parseInt(process.env.REDIS_PORT!);

if (!host || !port) {
  throw new Error('Redis env var not set');
}

export const redisConnection = new Redis(port, host, {
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
});