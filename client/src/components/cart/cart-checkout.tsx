'use client';

import type { ReactElement } from 'react';
import { useShallow } from 'zustand/shallow';
import { Button } from '@/components/button';
import {
  addToLibrary,
  checkout,
  deleteFromCart,
  deleteFromWishlist,
} from '@/lib/actions';
import { useToastStore } from '@/store/toast';

export function CartCheckout({ cartIds }: { cartIds: number[] }): ReactElement {
  const [setIsOpen, setMessage] = useToastStore(
    useShallow((state) => [state.setIsOpen, state.setMessage]),
  );

  const clickHandler = async (): Promise<void> => {
    const transactionToken = await checkout();

    window.snap.pay(transactionToken, {
      onSuccess: async () => {
        for (const id of cartIds) {
          await addToLibrary(id);
          await deleteFromCart(id);
          await deleteFromWishlist(id);
        }

        setIsOpen(true);
        setMessage('Payment success');
      },
      onError: () => {
        setIsOpen(true);
        setMessage('Payment failed');
      },
      onClose: () => {
        setIsOpen(true);
        setMessage('You closed the popup without finishing the payment');
      },
    });
  };

  return (
    <Button onClick={clickHandler} className="mt-4">
      Checkout
    </Button>
  );
}
