import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useMutation from '@lib/client/useMutation';
import { redirect } from 'next/dist/server/api-utils';
import { useRouter } from 'next/router';
interface CreateForm {
  name: string;
  email: string;
}

interface EnterMutationResult {
  ok: boolean;
}

export default () => {
  const [enter, { loading, data, error }] =
    useMutation<EnterMutationResult>('/api/user/enter');
  const { register, handleSubmit, reset } = useForm<CreateForm>();
  const onValid = (validForm: CreateForm) => {
    enter(validForm);
    reset();
  };
  const router = useRouter();
  const fn = () => {
    alert('please login');
    router.push('/log-in');
  };

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <h1>Create Account</h1>
      <label htmlFor="name">name : </label>
      <input
        {...register('name', { required: 'please enter your name' })}
        id="name"
      />
      <br />
      <label htmlFor="email">email : </label>
      <input
        {...register('email', { required: 'please enter your email' })}
        id="email"
      />
      <br />
      <button>Create Account</button>
      {data?.ok && fn()}
    </form>
  );
};
