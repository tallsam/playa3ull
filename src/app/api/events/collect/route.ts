import { NextResponse } from "next/server";
import { GameEvent, GameEventSchema } from "@/types/gameEvent";
import { formatZodError } from "@/lib/zod";
import { ZodError } from "zod";
import { addToGameEventProcessorQueue } from "@/lib/bullmq/jobs/gameEventProcessor";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const events: GameEvent[] = body.events;
    const validatedData = events.map((e) => GameEventSchema.parse(e));

    addToGameEventProcessorQueue(validatedData);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    if (error instanceof ZodError) {
      console.log(error);
      return NextResponse.json(
        { error: `Invalid event data: ${formatZodError(error)}` },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: "Invalid event data" }, { status: 400 });
  }
}
