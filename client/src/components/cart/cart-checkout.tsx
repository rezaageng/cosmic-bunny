'use client';

import type { ReactElement } from 'react';
import { useShallow } from 'zustand/shallow';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/button';
import {
  addToLibrary,
  checkout,
  deleteFromCart,
  deleteFromWishlist,
  updateOrder,
} from '@/lib/actions';
import { useToastStore } from '@/store/toast';
import { getCart, getWishlist } from '@/services';
import { getCookies } from '@/lib/utils';

export function CartCheckout({ gameIds }: { gameIds: number[] }): ReactElement {
  const [setIsOpen, setMessage, setVariant] = useToastStore(
    useShallow((state) => [
      state.setIsOpen,
      state.setMessage,
      state.setVariant,
    ]),
  );

  const router = useRouter();

  const clickHandler = async (): Promise<void> => {
    setIsOpen(true);
    setMessage('Processing payment...');
    setVariant('loading');

    const authToken = decodeURIComponent(getCookies('token'));

    const cart = await getCart({ token: authToken });
    const wishlist = await getWishlist({ token: authToken });

    const cartIds = cart.data.items
      .filter((item) => gameIds.includes(item.game.id))
      .map((item) => item.id);

    const wishlistIds = wishlist.data
      .filter((item) => gameIds.includes(item.game.id))
      .map((item) => item.id);

    const { orderId, token } = await checkout(gameIds);

    setIsOpen(false);
    setVariant('message');

    window.snap.pay(token, {
      onSuccess: async () => {
        await updateOrder({ id: orderId, status: 'succeed', gameIds });

        for (const id of gameIds) {
          await addToLibrary(id);
        }

        for (const id of cartIds) {
          await deleteFromCart(id);
        }

        for (const id of wishlistIds) {
          await deleteFromWishlist(id);
        }

        setIsOpen(true);
        setMessage('Payment success');
        router.push('/library');
      },
      onError: async () => {
        await updateOrder({ id: orderId, status: 'failed', gameIds });

        setIsOpen(true);
        setMessage('Payment failed');
      },
      onClose: async () => {
        await updateOrder({ id: orderId, status: 'failed', gameIds });

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
