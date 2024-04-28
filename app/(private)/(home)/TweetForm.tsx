'use client';
import { useForm } from 'react-hook-form';
import SubmitButton from '../../(sign)/SubmitButton';
import { useState } from 'react';
import useSWR from 'swr';

interface TweetForm {
  tweet: string;
}
export default function TweetForm() {
  const { data, mutate } = useSWR('/api/tweets');
  const { register, handleSubmit, reset } = useForm<TweetForm>();
  const [isLoading, setIsLoading] = useState(false);
  const onValid = async (formData: TweetForm) => {
    setIsLoading(true);

    await fetch('/api/tweets/enter', {
      body: JSON.stringify({ tweet: formData.tweet }),
      method: 'POST',
    });
    mutate('/api/tweets');
    reset();
    setIsLoading(false);
  };
  return (
    <form
      className="flex gap-1 mt-1"
      onSubmit={handleSubmit(onValid)}
      autoComplete="off"
    >
      <input
        type="text"
        placeholder="tweet"
        className="w-full p-2 border"
        {...register('tweet', { required: true })}
      />
      <SubmitButton isLoading={isLoading} text="SEND" />
    </form>
  );
}
