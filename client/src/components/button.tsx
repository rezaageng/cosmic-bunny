import type { ButtonHTMLAttributes, ReactElement } from 'react';
import { cn } from '@/lib/utils';

export function Button({
  type,
  className,
  children,
}: ButtonHTMLAttributes<HTMLButtonElement>): ReactElement {
  return (
    <button
      type={type === 'button' ? 'button' : 'submit'}
      className={cn(
        'w-full rounded-xl bg-indigo-700 px-4 py-2 active:bg-indigo-800',
        className,
      )}
    >
      {children}
    </button>
  );
}
