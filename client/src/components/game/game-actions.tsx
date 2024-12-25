'use client';

import { useTransition, type ReactElement } from 'react';
import { Button } from '@/components/button';
import { addToCart, addToLibrary, addToWishlist } from '@/lib/actions';

export function GameActions({ id }: { id: number }): ReactElement {
  const [isPending, setTransition] = useTransition();

  return (
    <>
      <Button
        onClick={() => {
          if (isPending) return;
          setTransition(async () => {
            await addToLibrary(id);
          });
        }}
        disabled={isPending}
      >
        Buy
      </Button>
      <Button
        variant="secondary"
        onClick={() => {
          if (isPending) return;
          setTransition(async () => {
            await addToCart(id);
          });
        }}
        disabled={isPending}
      >
        Add To Cart
      </Button>
      <Button
        variant="secondary"
        onClick={() => {
          if (isPending) return;
          setTransition(async () => {
            await addToWishlist(id);
          });
        }}
        disabled={isPending}
      >
        Add To Wishlist
      </Button>
    </>
  );
}
