import { z } from "zod";

export enum GameEventType {
  MATCH_START = "MATCH_START",
  MATCH_END = "MATCH_END",
  ACHIEVEMENT_UNLOCKED = "ACHIEVEMENT_UNLOCKED",
  PLAYER_DEATH = "PLAYER_DEATH",
  PLAYER_SPAWN = "PLAYER_SPAWN",
  ITEM_PURCHASE = "ITEM_PURCHASE",
  LEVEL_UP = "LEVEL_UP",
  SESSION_START = "SESSION_START",
  SESSION_END = "SESSION_END",
}

export const GameEventSchema = z.object({
  id: z.number(),
  createdAt: z.string().datetime(),
  eventType: z.enum(Object.values(GameEventType) as [string, ...string[]]), // zod enums must have one value
  playerId: z.string(),
  sessionId: z.string().optional(),
  gameId: z.string(),
  serverId: z.string().optional(),
  matchId: z.string().optional(),
  score: z.number().optional(),
  position: z
    .object({
      x: z.number(),
      y: z.number(),
      z: z.number(),
    })
    .optional(),
  itemId: z.string().optional(),
  achievement: z.string().optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export type GameEvent = z.infer<typeof GameEventSchema>;
