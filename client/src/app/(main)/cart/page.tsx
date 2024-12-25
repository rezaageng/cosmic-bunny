import Image from 'next/image';
import type { ReactElement } from 'react';
<<<<<<< HEAD
import { Button } from '@/components/button';

const games = [
  {
    name: 'Forza Horizon 4',
    description: 'lorem ipsum',
    publisher: 'atlus',
    price: 460000,
    updated_at: '2024-12-16T03:08:07.000000Z',
    created_at: '2024-12-16T03:08:07.000000Z',
    id: 6,
  },
  {
    name: 'Minecraft',
    description: 'lorem ipsum',
    publisher: 'atlus',
    price: 10000,
    updated_at: '2024-12-16T03:08:07.000000Z',
    created_at: '2024-12-16T03:08:07.000000Z',
    id: 6,
  },
  {
    name: 'Lego Star Wars',
    description: 'lorem ipsum',
    publisher: 'atlus',
    price: 15000,
    updated_at: '2024-12-16T03:08:07.000000Z',
    created_at: '2024-12-16T03:08:07.000000Z',
    id: 6,
  },
  {
    name: 'Elden Ring',
    description: 'lorem ipsum',
    publisher: 'atlus',
    price: 79000,
    updated_at: '2024-12-16T03:08:07.000000Z',
    created_at: '2024-12-16T03:08:07.000000Z',
    id: 6,
  },
  {
    name: 'GTA V',
    description: 'lorem ipsum',
    publisher: 'atlus',
    price: 130000,
    updated_at: '2024-12-16T03:08:07.000000Z',
    created_at: '2024-12-16T03:08:07.000000Z',
    id: 6,
  },
];

export default function Cart(): ReactElement {
  return (
    <section className="mx-auto max-w-screen-2xl space-y-6 p-4">
      <h2 className="text-3xl font-bold text-white">Nama User Wishlist</h2>

      {/* Game List */}
      <div className="space-y-6">
        {games.map((game) => (
          <div
            key={game.id}
            className="flex items-center justify-between space-x-6 rounded-2xl bg-gray-800 p-4"
          >
            {/* Image */}

            {/* Game Info */}
            <div className="flex items-center gap-x-8 text-white">
              <Image
                className="aspect-[4/3] w-32 rounded"
                src="/images/placeholder.png"
                alt="placeholder"
                width={28}
                height={50}
              />
              <div>
                <h3 className="text-lg font-semibold">{game.name}</h3>
                <span className="text-gray-400">IDR {game.price}</span>
              </div>
            </div>
            <div className="space-y-2 text-lg font-semibold">
              <Button className="bg-red-500">Remove</Button>
            </div>
          </div>
        ))}
      </div>
      <div className="inline-block rounded-2xl bg-gray-800 p-5 text-2xl font-bold text-white">
        Total : IDR 100.000
      </div>
=======
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
>>>>>>> 1ca5bef1da49ba16df127f58f82e8a2df901ce8f
    </section>
  );
}
