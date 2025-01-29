import prisma from "../../../../testing/prisma/client";
import { prismaMock } from "../../../../testing/prisma/singleton";
import { processGameEvents, worker } from "./gameEventProcessor";

// Mock BullMQ
jest.mock("bullmq", () => ({
  Queue: jest.fn(),
  Worker: jest.fn(() => ({
    on: jest.fn(),
  })),
}));

// Mock Redis connection
jest.mock("@/lib/redis", () => ({
  redisConnection: jest.fn(),
}));

describe("processGameEvents", () => {
  afterAll(async () => {
    await prisma.$disconnect();
    jest.clearAllMocks();
  });

  const events = [
    {
      id: 128,
      createdAt: "2025-01-29T01:37:05.102Z",
      eventType: "MATCH_START",
      playerId: "player_123",
      gameId: "fortnite_br",
      sessionId: "session_456",
      serverId: "eu-west-1",
      matchId: "match_789",
      position: {
        x: 100.5,
        y: 0.0,
        z: -50.2,
      },
      metadata: {
        gameMode: "battle_royale",
        mapName: "olympus",
        teamSize: 3,
      },
    },
  ];

  it("should throw error if createMany fails", async () => {
    console.log("pm", prismaMock);
    prismaMock.gameEvent.createMany.mockImplementation(() => {
      throw new Error();
    });
    expect(await processGameEvents(events)).rejects;
  });
});
