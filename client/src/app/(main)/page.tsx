import Image from 'next/image';
import type { ReactElement } from 'react';
import { GameList } from '@/components/home/game-list';
import { getGames } from '@/services';

export default async function Home(): Promise<ReactElement> {
  const games = await getGames({});

  return (
    <section className="mx-auto max-w-screen-2xl space-y-8 px-4">
      {/* Featured Games Section */}
      <div className="relative h-96 w-full overflow-clip rounded-3xl">
        <Image
          src="/images/auth-image.jpg"
          alt="promotional"
          fill
          className="object-cover"
        />
      </div>
      {/* Newly Released Games Section */}
      <GameList title="New Games" games={games.data} />
    </section>
  );
}
