import type { ReactElement } from 'react';
import { cookies } from 'next/headers';
import { Rabbit } from 'lucide-react';
import { GameCard } from '@/components/game-card';
import { getLibrary } from '@/services';

export default async function Library(): Promise<ReactElement> {
  const token = cookies().get('token')?.value ?? '';

  const { data } = await getLibrary({ token });

  return (
    <section className="mx-auto max-w-screen-2xl space-y-8 px-4">
      {data.length === 0 ? (
        <div className="grid h-[calc(100svh-80px-32px)] w-full place-items-center">
          <Rabbit size={256} className="w-full text-zinc-800" />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data.map((game) => (
            <GameCard
              key={game.id}
              gameId={game.game.id}
              image={game.game.image}
              name={game.game.name}
            />
          ))}
        </div>
      )}
    </section>
  );
}
