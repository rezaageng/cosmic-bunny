import Image from 'next/image';
import type { ReactElement } from 'react';
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
    </section>
  );
}
