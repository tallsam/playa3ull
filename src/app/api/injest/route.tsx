import { NextRequest, NextResponse } from "next/server";

export const POST = async (
  req: NextRequest
): Promise<NextResponse | Response> => {
  const body = await req.json();

  console.log("output");

  return NextResponse.json({}, { status: 200 });
};
