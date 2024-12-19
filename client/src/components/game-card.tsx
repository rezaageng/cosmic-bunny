import Image from 'next/image';
import Link from 'next/link';
import type { ReactElement } from 'react';
import type { GamesResponse } from '@/schemas/games';

interface GameCardProps {
  game: GamesResponse['data'][0];
  width?: number;
}

export function GameCard({ game, width }: GameCardProps): ReactElement {
  return (
    <Link href={`/game/${game.id.toString()}`} className="group space-y-2">
      <div
        style={{ width }}
        className="relative aspect-[2] flex-shrink-0 overflow-clip rounded-2xl"
      >
        <Image
          src={game.image}
          alt={game.name}
          fill
          className="object-cover group-hover:brightness-125"
        />
      </div>
      <h3 className="line-clamp-2 font-semibold text-gray-100 sm:text-lg">
        {game.name}
      </h3>
      <span className="block">IDR {game.price}</span>
    </Link>
  );
}
