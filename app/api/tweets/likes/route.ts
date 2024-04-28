import { getUserSession } from "@lib/server/session";
import client from "@lib/server/client";
import { NextResponse } from "next/server";

export async function GET() {
  const user = getUserSession();
  const likes = await client.like.findMany({
    where: {
      userId: user.id,
    },
    select: {
      tweetId: true,
    },
  });
  return NextResponse.json({ likes });
}
