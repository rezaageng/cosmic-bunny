import type { ButtonHTMLAttributes, ReactElement } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export function Button({
  type,
  className,
  children,
  variant = 'primary',
}: ButtonProps): ReactElement {
  return (
    <button
      type={type === 'button' ? 'button' : 'submit'}
      className={cn(
        'w-full rounded-xl font-semibold',
        {
          'bg-indigo-700 px-4 py-2 active:bg-indigo-800': variant === 'primary',
          'bg-gray-700 px-4 py-2 active:bg-gray-800': variant === 'secondary',
        },
        className,
      )}
    >
      {children}
    </button>
  );
}
