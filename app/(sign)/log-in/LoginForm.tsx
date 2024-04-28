'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import SubmitButton from '../SubmitButton';
import Validation from '../Validation';

interface LoginForm {
  email: string;
}
export default function LoginForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginForm>();
  const [isLoading, setIsLoading] = useState(false);
  const onVaild = async (formData: LoginForm) => {
    setIsLoading(true);
    try {
      const { ok, errorMessage } = await (
        await fetch('/api/user/enter', {
          body: JSON.stringify({ email: formData.email, type: 'log-in' }),
          method: 'POST',
        })
      ).json();
      if (ok === false) {
        setError('email', { message: errorMessage });
        return;
      } else {
        router.push('/');
      }
    } catch (error) {
      setError('email', { message: 'emailError' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className="w-full max-w-lg p-5 bg-white rounded-full"
      onSubmit={handleSubmit(onVaild)}
    >
      <h1 className="text-center">LOG IN</h1>
      <Validation
        register={register('email', {
          required: 'Enter your email address',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address',
          },
        })}
        error={errors.email}
        type="email"
        placeholder="email"
      />
      <div className="flex items-center justify-between">
        <SubmitButton isLoading={isLoading} text="Log in" />
        <Link href={'/create-account'} className="hover:bg-blue-100 p-2">
          Create account
        </Link>
      </div>
    </form>
  );
}
