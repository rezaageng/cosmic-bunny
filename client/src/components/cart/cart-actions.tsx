'use client';

import { useTransition, type ReactElement } from 'react';
import { Button } from '@/components/button';
import { deleteFromCart } from '@/lib/actions';

interface CartActionsProps {
  id: number;
}

export function CartActions({ id }: CartActionsProps): ReactElement {
  const [isPending, setTransition] = useTransition();

  return (
    <div className="flex items-center justify-end text-lg font-semibold">
      <Button
        variant="text"
        onClick={() => {
          if (isPending) return;

          setTransition(async () => {
            await deleteFromCart(id);
          });
        }}
        disabled={isPending}
        className="w-auto px-4 py-2 text-sm"
      >
        Remove
      </Button>
    </div>
  );
}
