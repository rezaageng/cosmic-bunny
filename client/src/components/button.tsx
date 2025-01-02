import type { ButtonHTMLAttributes, ReactElement } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'text' | 'danger' | 'outline';
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
          'bg-indigo-700 hover:bg-indigo-800': variant === 'primary',
          'cursor-not-allowed bg-indigo-500': variant === 'primary' && disabled,
          'bg-gray-700 hover:bg-gray-800': variant === 'secondary',
          'cursor-not-allowed bg-gray-500': variant === 'secondary' && disabled,
          'bg-transparent p-0 font-normal hover:underline': variant === 'text',
          'bg-rose-600 hover:bg-rose-700': variant === 'danger',
          'cursor-not-allowed bg-rose-400': variant === 'danger' && disabled,
          'border border-indigo-700 text-indigo-700 hover:bg-zinc-900':
            variant === 'outline',
          'bg-teal-500 hover:bg-teal-700': variant === 'accent',
        },
        className,
      )}
    >
      {children}
    </button>
  );
}
