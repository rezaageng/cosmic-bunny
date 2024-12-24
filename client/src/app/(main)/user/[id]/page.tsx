import type { ReactElement } from 'react';
import Image from 'next/image';
import { GameCard } from '@/components/game-card';

const games = [
  {
    name: 'Forza Horizon 4',
    description: 'lorem ipsum',
    publisher: 'atlus',
    price: 460000,
    image: '/images/placeholder.png',
    updated_at: '2024-12-16T03:08:07.000000Z',
    created_at: '2024-12-16T03:08:07.000000Z',
    id: 1,
  },
  {
    name: 'Lego Star Wars',
    description: 'lorem ipsum',
    publisher: 'atlus',
    price: 15000,
    image: '/images/placeholder.png',
    updated_at: '2024-12-16T03:08:07.000000Z',
    created_at: '2024-12-16T03:08:07.000000Z',
    id: 2,
  },
  {
    name: 'Minecraft',
    description: 'lorem ipsum',
    publisher: 'atlus',
    price: 10000,
    image: '/images/placeholder.png',
    updated_at: '2024-12-16T03:08:07.000000Z',
    created_at: '2024-12-16T03:08:07.000000Z',
    id: 6,
  },
];

export default function Profile(): ReactElement {
  return (
    <section className="mx-auto max-w-screen-2xl space-y-8 px-4">
      {/* Profile Section */}
      <div className="flex flex-col items-center space-y-4 p-6 rounded-lg shadow-lg">
        <Image
          src="/images/placeholder.png"
          alt="user-profile"
          width={150}
          height={150}
          className="rounded-full object-cover"
        />
        <h2 className="mt-4 text-2xl font-bold text-white">User Name</h2>
        <p className="text-gray-400 text-center">
          Deskripsi yang dibuat oleh user. Tambahkan sedikit informasi atau kalimat menarik di sini.
        </p>
      </div>

      {/* Games Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-100">Your Games</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 mt-4">
          {games.map((game) => (
            <GameCard
              key={game.id}
              gameId={game.id}
              name={game.name}
              image={game.image}
              price={game.price}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
