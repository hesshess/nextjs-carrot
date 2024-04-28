import { cls } from '@lib/client/utiles';

interface SubmitButtonProps {
  isLoading: boolean;
  text: string;
}
export default function SubmitButton({ isLoading, text }: SubmitButtonProps) {
  return (
    <button
      className={cls('p-2', isLoading ? '' : 'hover:bg-blue-100')}
      disabled={isLoading}
    >
      {isLoading ? 'Loading...' : text}
    </button>
  );
}
