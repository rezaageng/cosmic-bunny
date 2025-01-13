import type { ReactElement } from 'react';
import { cookies } from 'next/headers';
import { UserIcon } from 'lucide-react';
import { GameCard } from '@/components/game-card';
import { getCurrentUser, getLibrary } from '@/services';

export default async function Profile(): Promise<ReactElement> {
  const token = cookies().get('token')?.value ?? '';

  const user = await getCurrentUser({ token });
  const games = await getLibrary({ token });

  return (
    <section className="mx-auto max-w-screen-2xl space-y-8 px-4">
      {/* Profile Section */}
      <div className="flex flex-col items-center space-y-4 rounded-lg p-6 shadow-lg">
        <div className="grid aspect-square w-32 place-items-center rounded-full bg-indigo-600 p-4">
          <UserIcon width={64} height={64} />
        </div>
        <h2 className="mt-4 text-2xl font-bold text-white">
          {user.data?.name}
        </h2>
      </div>

      {/* Games Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-100">Your Games</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {games.data.map((item) => (
            <GameCard
              key={item.id}
              gameId={item.id}
              name={item.game.name}
              image={item.game.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
