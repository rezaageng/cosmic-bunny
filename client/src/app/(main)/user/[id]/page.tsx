import type { ReactElement } from 'react';
import Image from 'next/image';
import { GameCard } from '@/components/game-card';

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
  {
    name: 'GTA III',
    description: 'lorem ipsum',
    publisher: 'atlus',
    price: 10000,
    updated_at: '2024-12-16T03:08:07.000000Z',
    created_at: '2024-12-16T03:08:07.000000Z',
    id: 6,
  },
];

export default function Profile(): ReactElement {
  return (
    <section className="mx-auto max-w-screen-2xl space-y-8 px-4">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col space-y-2">
          <Image
            src="/images/placeholder.png"
            alt="user-profile"
            width={150}
            height={150}
            className="rounded-full object-cover"
          />
          <h2 className="mt-4 text-2xl font-bold text-white">User Name</h2>
          <p className="text-gray-500">Deskripsi yang dibuat oleh user</p>
        </div>
      </div>
      
      <h2 className="text-left text-2xl font-bold text-gray-100">Your Game</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </section>
  );
}
