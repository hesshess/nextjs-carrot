import { getUserSession } from "@lib/server/session";
import { NextRequest, NextResponse } from "next/server";
import { getTweet } from "@lib/server/tweet";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const user = getUserSession();
  if (user) {
    const tweet = await getTweet({ tweetId: +id, userId: user.id });
    return NextResponse.json({ ok: true, result: tweet });
  } else {
    return NextResponse.json({ ok: false });
  }
}
