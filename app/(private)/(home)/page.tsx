import { authWithUserSession } from '@lib/server/auth';
import { SWRProvider } from '@lib/client/swr-provider';
import TweetForm from './TweetForm';
import Tweets from './Tweets';
import { getTweets } from '@lib/server/tweet';

export default async function Home() {
  const userSession = authWithUserSession();
  const tweets = await getTweets();
  return (
    <SWRProvider>
      <main className="w-full min-h-screen pb-10">
        <div className="flex flex-col max-w-xl mx-auto">
          <div className="p-5 mt-5 bg-white border-b">
            <h1 className="mb-3 font-semibold text-center">
              {userSession.name}&apos;s Feed
            </h1>
            <TweetForm />
          </div>
          <Tweets tweets={tweets} />
        </div>
      </main>
    </SWRProvider>
  );
}
