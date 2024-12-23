import Image from 'next/image';
import type { ReactElement } from 'react';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { Rabbit } from 'lucide-react';
import { getCart } from '@/services';
import { formatCurrency } from '@/lib/utils';
import { CartActions } from '@/components/cart/cart-actions';
import { Button } from '@/components/button';

export default async function Cart(): Promise<ReactElement> {
  const token = cookies().get('token')?.value ?? '';

  const { data } = await getCart({ token });

  return (
    <section className="mx-auto block max-w-screen-xl gap-4 p-4 lg:flex">
      {data.items.length === 0 ? (
        <div className="grid h-[calc(100svh-80px-32px)] w-full place-items-center">
          <Rabbit size={256} className="w-full text-zinc-800" />
        </div>
      ) : (
        <>
          <div className="space-y-4 lg:w-3/4">
            {data.items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col space-x-6 rounded-lg bg-zinc-900 p-4 sm:flex-row sm:justify-between"
              >
                <Link
                  href={`/game/${item.game.id.toString()}`}
                  className="flex items-center gap-x-4 text-white"
                >
                  <Image
                    className="aspect-[2] w-32 rounded object-cover"
                    src={item.game.image}
                    alt={item.game.name}
                    width={128}
                    height={64}
                  />
                  <div>
                    <h3 className="line-clamp-1 text-lg font-semibold">
                      {item.game.name}
                    </h3>
                    <span className="text-gray-400">
                      {formatCurrency(item.game.price)}
                    </span>
                  </div>
                </Link>
                <CartActions id={item.id} />
              </div>
            ))}
          </div>
          <div className="lg:w-1/4">
            <div className="sticky top-4 mt-4 rounded-lg bg-zinc-900 p-4 lg:mt-0 lg:p-10">
              <div className="flex items-center justify-between lg:block">
                <h2 className="text-lg font-semibold">Total</h2>
                <p className="text-2xl font-semibold">
                  {formatCurrency(data.amount)}
                </p>
              </div>
              <Button className="mt-4">Checkout</Button>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
