'use client';

import { useTransition, type ReactElement } from 'react';
import { Button } from '@/components/button';
import { addToWishlist } from '@/lib/actions';

export function GameActions({ id }: { id: number }): ReactElement {
  const [isPending, setTransition] = useTransition();

  return (
    <>
      <Button>Buy</Button>
      <Button variant="secondary">Add To Cart</Button>
      <Button
        onClick={() => {
          if (isPending) return;
          setTransition(async () => {
            await addToWishlist(id);
          });
        }}
        variant="secondary"
        disabled={isPending}
      >
        Add To Wishlist
      </Button>
    </>
  );
}
