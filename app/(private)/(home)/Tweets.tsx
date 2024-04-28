'use client';

import useSWR from 'swr';
import TweetComponent, { TweetProps } from '../tweet/[id]/Tweet';

export default function Tweets({ tweets }: { tweets: TweetProps[] }) {
  const { data } = useSWR<TweetProps[]>('/api/tweets');

  return (
    <div className="flex flex-col">
      {(tweets && data === undefined) || (tweets && typeof data !== 'object')
        ? tweets.map((tweet) => <TweetComponent tweet={tweet} key={tweet.id} />)
        : data?.map((tweet) => <TweetComponent tweet={tweet} key={tweet.id} />)}
    </div>
  );
}
