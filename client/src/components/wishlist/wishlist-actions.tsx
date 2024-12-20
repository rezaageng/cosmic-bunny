'use client';

import { useTransition, type ReactElement } from 'react';
import { Button } from '@/components/button';
import { addToCart, deleteFromWishlist } from '@/lib/actions';

interface WishlistActionsProps {
  id: number;
  gameID: number;
}

export function WishlistActions({
  gameID,
  id,
}: WishlistActionsProps): ReactElement {
  const [isPending, setTransition] = useTransition();

  return (
    <div className="flex items-center justify-end text-lg font-semibold">
      <Button
        variant="text"
        onClick={() => {
          if (isPending) return;

          setTransition(async () => {
            await deleteFromWishlist(id);
          });
        }}
        disabled={isPending}
        className="w-auto px-4 py-2 text-sm"
      >
        Remove
      </Button>
      <Button
        onClick={() => {
          if (isPending) return;

          setTransition(async () => {
            await addToCart(gameID);
          });
        }}
        disabled={isPending}
        className="w-auto text-sm"
      >
        Add to Cart
      </Button>
    </div>
  );
}
