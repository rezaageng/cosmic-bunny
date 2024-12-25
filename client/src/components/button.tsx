import type { ButtonHTMLAttributes, ReactElement } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'text';
}

export function Button({
  type,
  className,
  children,
  variant = 'primary',
  disabled = false,
  ...props
}: ButtonProps): ReactElement {
  return (
    <button
      {...props}
      type={type === 'button' ? 'button' : 'submit'}
      className={cn(
        'w-full rounded-xl px-4 py-2 font-semibold text-white',
        {
          'bg-indigo-700 active:bg-indigo-800': variant === 'primary',
          'cursor-not-allowed bg-indigo-500': variant === 'primary' && disabled,
          'bg-gray-700 active:bg-gray-800': variant === 'secondary',
          'cursor-not-allowed bg-gray-500': variant === 'secondary' && disabled,
          'bg-transparent p-0 font-normal hover:underline': variant === 'text',
        },
        className,
      )}
    >
      {children}
    </button>
  );
}
