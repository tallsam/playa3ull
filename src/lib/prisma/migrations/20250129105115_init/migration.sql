-- CreateTable
CREATE TABLE "GameEvent" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "eventType" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "sessionId" TEXT,
    "gameId" TEXT NOT NULL,
    "serverId" TEXT,
    "matchId" TEXT,
    "score" INTEGER,
    "position" JSONB,
    "itemId" TEXT,
    "achievement" TEXT,
    "metadata" JSONB,

    CONSTRAINT "GameEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "GameEvent_playerId_idx" ON "GameEvent"("playerId");

-- CreateIndex
CREATE INDEX "GameEvent_sessionId_idx" ON "GameEvent"("sessionId");

-- CreateIndex
CREATE INDEX "GameEvent_eventType_idx" ON "GameEvent"("eventType");

-- CreateIndex
CREATE INDEX "GameEvent_createdAt_idx" ON "GameEvent"("createdAt");
