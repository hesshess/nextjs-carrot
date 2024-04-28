import { TweetProps } from "../../(private)/tweet/[id]/Tweet";
import client from "@lib/server/client";

export async function getTweets() {
  const tweets = (await client?.tweet.findMany({
    include: {
      user: {
        select: { name: true },
      },
      _count: {
        select: {
          Like: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  })) as TweetProps[];

  return tweets;
}

export async function getTweet({
  tweetId,
  userId,
}: {
  tweetId: number;
  userId: number;
}) {
  const tweet = await client.tweet.findUnique({
    where: {
      id: tweetId,
    },
    include: {
      user: {
        select: {
          name: true,
        },
      },
      _count: {
        select: {
          Like: true,
        },
      },
    },
  });
  const isLiked = Boolean(
    await client.like.findFirst({
      where: { tweetId: tweetId, userId: userId },
      select: { id: true },
    })
  );
  return { tweet, isLiked };
}
