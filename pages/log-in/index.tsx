import useMutation from '@lib/client/useMutation';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface LoginForm {
  email: string;
}

const Login: NextPage = () => {
  const [confirm, { loading, data, error }] = useMutation('/api/user/confirm');
  const { register, handleSubmit } = useForm<LoginForm>();
  const onValid = (data: LoginForm) => {
    confirm(data);
  };
  const router = useRouter();
  useEffect(() => {
    if (data?.ok) {
      console.log('asdf');
      router.push('/');
    }
  }, [data, router]);
  return (
    <form onSubmit={handleSubmit(onValid)}>
      <h1>Login</h1>
      <label htmlFor="email">email : </label>
      <input {...register('email')} />
      <button>Login</button>
    </form>
  );
};

export default Login;
