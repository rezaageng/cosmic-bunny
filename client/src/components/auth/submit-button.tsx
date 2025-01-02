import { type ReactElement, type ReactNode } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/button';
import { cn } from '@/lib/utils';

export function SubmitButton({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}): ReactElement {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className={cn({ 'cursor-not-allowed bg-indigo-300': pending }, className)}
    >
      {children}
    </Button>
  );
}
