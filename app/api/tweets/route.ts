import { getTweets } from "@lib/server/tweet";
import { NextResponse } from "next/server";

export async function GET() {
  const tweets = await getTweets();
  return NextResponse.json(tweets);
}
