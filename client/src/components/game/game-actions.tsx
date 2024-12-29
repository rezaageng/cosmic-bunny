'use client';

import { useEffect, useTransition, type ReactElement } from 'react';
import { useShallow } from 'zustand/shallow';
import { Button } from '@/components/button';
import {
  addToCart,
  addToLibrary,
  addToWishlist,
  checkout,
  deleteFromCart,
  deleteFromWishlist,
  updateOrder,
} from '@/lib/actions';
import { useToastStore } from '@/store/toast';
import { getCookies } from '@/lib/utils';
import { getCart, getWishlist } from '@/services';

interface GameActionsProps {
  id: number;
  isInLibrary: boolean;
}

export function GameActions({
  id,
  isInLibrary,
}: GameActionsProps): ReactElement {
  const [setIsOpen, setMessage, setVariant] = useToastStore(
    useShallow((state) => [
      state.setIsOpen,
      state.setMessage,
      state.setVariant,
    ]),
  );

  const [isPending, setTransition] = useTransition();

  const buyHandler = async (): Promise<void> => {
    setIsOpen(true);
    setMessage('Processing payment...');
    setVariant('loading');

    const authToken = decodeURIComponent(getCookies('token'));

    const cart = await getCart({ token: authToken });
    const wishlist = await getWishlist({ token: authToken });

    const cartId = cart.data.items.filter((item) => item.game.id === id)[0]?.id;

    const wishlistId = wishlist.data.filter((item) => item.game.id === id)[0]
      ?.id;

    const { orderId, token } = await checkout([id]);

    setIsOpen(false);
    setVariant('message');

    if (!token) {
      await addToLibrary(id);

      if (cartId) await deleteFromCart(cartId);
      if (wishlistId) await deleteFromWishlist(wishlistId);

      return;
    }

    window.snap.pay(token, {
      onSuccess: async () => {
        await updateOrder({ id: orderId, status: 'succeed', gameIds: [id] });

        await addToLibrary(id);

        if (cartId) await deleteFromCart(cartId);

        if (wishlistId) await deleteFromWishlist(wishlistId);

        setIsOpen(true);
        setMessage('Payment success');
      },
      onError: async () => {
        await updateOrder({ id: orderId, status: 'failed', gameIds: [id] });

        setIsOpen(true);
        setMessage('Payment failed');
      },
      onClose: async () => {
        await updateOrder({ id: orderId, status: 'failed', gameIds: [id] });

        setIsOpen(true);
        setMessage('You closed the popup without finishing the payment');
      },
    });
  };

  useEffect(() => {
    if (isPending) {
      setIsOpen(true);
      setMessage('Processing request...');
      setVariant('loading');
      return;
    }

    setVariant('message');
    setMessage('Request success');
  }, [isPending, setIsOpen, setMessage, setVariant]);

  return !isInLibrary ? (
    <>
      <Button
        onClick={() => {
          if (isPending) return;
          setTransition(async () => {
            await buyHandler();
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
  ) : (
    <Button variant="accent">Play</Button>
  );
}
