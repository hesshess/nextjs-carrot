'use client';
import type { Tweet } from '@prisma/client';
import Link from 'next/link';
import useSWR from 'swr';
import { useEffect, useState } from 'react';

export interface TweetProps extends Tweet {
  user: { name: string };
  _count: { Like: number };
}
interface Likes {
  tweetId: number;
}
export default function Tweet({ tweet }: { tweet: TweetProps }) {
  const { data } = useSWR<{ likes: Likes[] }>('/api/tweets/likes');
  const [isLiked, setIsLiked] = useState(false);
  useEffect(() => {
    if (data) {
      const { likes } = data;
      setIsLiked(
        likes.some((like) => {
          return like.tweetId === tweet.id;
        })
      );
    }
  }, [data, tweet]);

  return (
    <Link
      href={`/tweet/${tweet.id}`}
      className="p-5 transition-all bg-white border-b"
    >
      <div>
        <div className="text-center">{tweet.text}</div>
      </div>
    </Link>
  );
}
