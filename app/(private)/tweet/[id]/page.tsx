import { authWithUserSession } from '@lib/server/auth';
import { SWRProvider } from '@lib/client/swr-provider';
import { getTweet } from '@lib/server/tweet';
import LikeBox from './LikeBox';
import Link from 'next/link';

export default async function TweetPage({
  params,
}: {
  params: { id: string };
}) {
  const user = await authWithUserSession();
  const { id } = params;
  const { tweet, isLiked } = await getTweet({
    tweetId: +params.id,
    userId: user.id,
  });

  return (
    <SWRProvider>
      <main className="flex items-center justify-center w-full min-h-screen pb-10 ">
        <div className="flex flex-col w-full max-w-xl">
          <Link href={'/'} className="border-t border-b">
            <div className="relative flex items-center p-5 bg-white">
              <div className="size-4">
                <svg
                  data-slot="icon"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z"
                  ></path>
                </svg>
              </div>
            </div>
          </Link>
          <div className="p-5 bg-white">
            <h5 className="mb-2 text-sm font-semibold">{tweet?.user.name}</h5>
            <span className="text-4xl">{tweet?.text}</span>
          </div>
          <LikeBox
            barStatus={{
              tweetId: +id,
              like: { isLiked: isLiked, length: tweet?._count.Like },
            }}
          />
          <div></div>
        </div>
      </main>
    </SWRProvider>
  );
}
