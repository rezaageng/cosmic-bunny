import Image from 'next/image';
import type { ReactElement } from 'react';
import { GameList } from '@/components/home/game-list';
import { getCategories } from '@/services';

export default async function Home(): Promise<ReactElement> {
  const { data } = await getCategories({});

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
      {[...data]
        .filter((category) => category.games.length > 0)
        .map((category) => (
          <GameList
            key={`game-category-${category.id.toString()}`}
            title={category.name}
            games={category.games}
          />
        ))}
    </section>
  );
}
