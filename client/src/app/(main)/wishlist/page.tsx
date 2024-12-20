import Image from 'next/image';
import type { ReactElement } from 'react';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { Rabbit } from 'lucide-react';
import { getWishlist } from '@/services';
import { WishlistActions } from '@/components/wishlist/wishlist-actions';
import { formatCurrency } from '@/lib/utils';

export default async function Wishlist(): Promise<ReactElement> {
  const token = cookies().get('token')?.value ?? '';

  const { data } = await getWishlist({ token });

  return (
    <section className="mx-auto max-w-screen-lg p-4">
      <div className="space-y-4">
        {data.length === 0 ? (
          <div className="grid h-[calc(100svh-80px-32px)] w-full place-items-center">
            <Rabbit size={256} className="w-full text-zinc-800" />
          </div>
        ) : (
          data.map((wishlist) => (
            <div
              key={wishlist.id}
              className="flex flex-col space-x-6 rounded-lg bg-zinc-900 p-4 sm:flex-row sm:justify-between"
            >
              <Link
                href={`/game/${wishlist.game.id.toString()}`}
                className="flex items-center gap-x-4 text-white"
              >
                <Image
                  className="aspect-[2] w-32 rounded object-cover"
                  src={wishlist.game.image}
                  alt={wishlist.game.name}
                  width={128}
                  height={64}
                />
                <div>
                  <h3 className="line-clamp-1 text-lg font-semibold">
                    {wishlist.game.name}
                  </h3>
                  <span className="text-gray-400">
                    {formatCurrency(wishlist.game.price)}
                  </span>
                </div>
              </Link>
              <WishlistActions id={wishlist.id} gameID={wishlist.game.id} />
            </div>
          ))
        )}
      </div>
    </section>
  );
}
