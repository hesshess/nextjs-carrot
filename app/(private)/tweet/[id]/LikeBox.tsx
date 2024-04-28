'use client';

import { useState } from 'react';
import LikeButton from './LikeButton';
import useSWR from 'swr';

interface LikeBoxProps {
  tweetId: number;
  like: { length: number | undefined; isLiked: boolean };
  homeTweet?: boolean;
}
export default function LikeBox({ barStatus }: { barStatus: LikeBoxProps }) {
  const { data, mutate } = useSWR(`/api/tweets/${barStatus.tweetId}`);

  const [isLiked, setIsLiked] = useState(barStatus.like.isLiked);
  const [likeLength, setLikeLength] = useState(barStatus.like.length!);

  const onLikeClick = async () => {
    setIsLiked((prev) => !prev);
    if (isLiked) {
      setLikeLength((prev) => prev - 1);
    } else {
      setLikeLength((prev) => prev + 1);
    }
    await fetch(`/api/tweets/${barStatus.tweetId}/like`);
    mutate();
  };

  return (
    <div className="relative flex justify-center px-2 border-2">
      <LikeButton
        onClick={onLikeClick}
        isLiked={data ? data.result.isLiked : isLiked}
        likes={data ? data.result.tweet._count.Like : likeLength}
      />
    </div>
  );
}
