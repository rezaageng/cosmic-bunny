import Image from 'next/image';
import Link from 'next/link';
import type { ReactElement } from 'react';

interface GameCardProps {
  gameId: number;
  name: string;
  image: string;
  price?: number;
  width?: number;
}

export function GameCard({
  gameId,
  image,
  name,
  price,
  width,
}: GameCardProps): ReactElement {
  return (
    <Link href={`/game/${gameId.toString()}`} className="group space-y-2">
      <div
        style={{ width }}
        className="relative aspect-[2] flex-shrink-0 overflow-clip rounded-lg"
      >
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover group-hover:brightness-125"
        />
      </div>
      <h3 className="line-clamp-2 font-semibold text-gray-100 sm:text-lg">
        {name}
      </h3>
      {price ? <span className="block">IDR {price}</span> : null}
    </Link>
  );
}
