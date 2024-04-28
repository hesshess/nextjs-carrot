import { cls } from '@lib/client/utiles';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

interface InputProps {
  register: UseFormRegisterReturn;
  error: FieldError | undefined;
  type: string;
  placeholder: string;
  [key: string]: any;
}
export default function Validation({
  register,
  error,
  type,
  placeholder,
}: InputProps) {
  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        className={cls(
          'w-full p-2 border outline-none',
          error ? 'border-red-400' : ''
        )}
        {...register}
      />
      <span className=" text-red-400">
        {error && <div className="flex items-center mt-2">{error.message}</div>}
      </span>
    </div>
  );
}
