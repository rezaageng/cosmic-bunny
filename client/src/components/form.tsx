import type {
  InputHTMLAttributes,
  LabelHTMLAttributes,
  ReactElement,
  ReactNode,
} from 'react';
import { cn } from '@/lib/utils';

export function InputGroup({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}): ReactElement {
  return (
    <div
      className={cn(
        'flex flex-col gap-y-1 focus-within:text-indigo-700',
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Label({
  htmlFor,
  className,
  children,
  ...props
}: LabelHTMLAttributes<HTMLLabelElement>): ReactElement {
  return (
    <label
      htmlFor={htmlFor}
      className={cn('font-semibold', className)}
      {...props}
    >
      {children}
    </label>
  );
}

export function TextInput({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>): ReactElement {
  return (
    <input
      autoComplete="off"
      className={cn(
        'rounded-xl bg-black px-4 py-2 text-white outline outline-gray-800 focus:outline-indigo-700',
        className,
      )}
      {...props}
    />
  );
}

export function CheckBox({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>): ReactElement {
  return (
    <input
      type="checkbox"
      className={cn('accent-indigo-700', className)}
      {...props}
    />
  );
}

export function ErrorMessage({
  children,
  className,
}: {
  children?: string;
  className?: string;
}): ReactElement {
  return (
    <span className={cn('text-sm text-rose-500', className)}>{children}</span>
  );
}
