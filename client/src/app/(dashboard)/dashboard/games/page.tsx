import Image from 'next/image';
import type { ReactElement } from 'react';
import Link from 'next/link';
import { Plus, Rabbit } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { getGames } from '@/services';
import { GameCardActions } from '@/components/game-dashboard/game-card-actions';
import { GameSearch } from '@/components/game-dashboard/game-search';

export default async function GameDashboard({
  searchParams,
}: {
  searchParams: { search: string };
}): Promise<ReactElement> {
  const { data } = await getGames({ search: searchParams.search });

  return (
    <section className="mx-auto max-w-screen-xl space-y-8 p-4">
      <div className="space-y-4">
        <div className="mb-6 flex items-center justify-between">
          <GameSearch />
          <Link
            href="/dashboard/game/add"
            className="flex items-center gap-2 text-sm font-semibold text-indigo-500"
          >
            <Plus /> <span>Add Game</span>
          </Link>
        </div>
        {data.length === 0 ? (
          <div className="grid h-[calc(100svh-80px-32px)] w-full place-items-center">
            <Rabbit size={256} className="w-full text-zinc-800" />
          </div>
        ) : (
          <div className="space-y-4">
            {data.map((game) => (
              <div
                key={game.id}
                className="flex flex-col space-x-6 rounded-lg bg-zinc-900 p-4 sm:flex-row sm:justify-between"
              >
                <Link
                  href={`/game/${game.id.toString()}`}
                  className="flex items-center gap-x-4 text-white"
                >
                  <Image
                    className="aspect-[2] w-32 rounded object-cover"
                    src={game.header_img}
                    alt={game.name}
                    width={128}
                    height={64}
                  />
                  <div>
                    <h3 className="line-clamp-1 text-lg font-semibold">
                      {game.name}
                    </h3>
                    <span className="text-gray-400">
                      {formatCurrency(game.price)}
                    </span>
                  </div>
                </Link>
                <GameCardActions id={game.id} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
