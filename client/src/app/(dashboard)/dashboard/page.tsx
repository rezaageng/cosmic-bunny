import Image from 'next/image';
import type { ReactElement } from 'react';
import Link from 'next/link';
import { formatCurrency } from '@/lib/utils';

const cartData = [
  {
    id: 1,
    game: {
      id: 101,
      name: 'The Witcher 3: Wild Hunt',
      image: '/images/placeholder.png',
      price: 199000,
    },
  },
  {
    id: 2,
    game: {
      id: 103,
      name: 'Cyberpunk 2077',
      image: '/images/placeholder.png',
      price: 249000,
    },
  },
  {
    id: 3,
    game: {
      id: 104,
      name: 'Red Dead Redemption 2',
      image: '/images/placeholder.png',
      price: 179000,
    },
  },
];

interface SectionProps {
  data: typeof cartData;
}

function Section({ data }: SectionProps): ReactElement {
  return (
    <section className="mx-auto max-w-screen-2xl space-y-8 p-4">
      <div className="space-y-4">
        <div className="mb-6 flex items-center justify-between">
          <button
            type="button"
            className="ml-auto rounded-lg bg-blue-500 px-3 py-1.5 text-white transition-colors duration-300 hover:bg-blue-600 focus:outline-none"
          >
            Add Game
          </button>
        </div>
        {data.length === 0 ? (
          <div className="mt-8 grid h-[calc(100vh-160px)] w-full place-items-center py-8">
            <p>No items available</p>
          </div>
        ) : (
          <div className="space-y-4">
            {data.map((item) => (
              <div
                key={item.id}
                className="flex flex-col space-y-6 rounded-lg bg-zinc-900 p-4 sm:flex-row sm:justify-between sm:space-x-6 sm:space-y-0"
              >
                <Link
                  href={`/game/${item.game.id.toString()}`}
                  className="flex items-center gap-x-4 text-white"
                >
                  <Image
                    className="aspect-[2] h-32 w-32 rounded object-cover sm:h-32 sm:w-32 lg:h-40 lg:w-40"
                    src={item.game.image}
                    alt={item.game.name}
                    width={128}
                    height={128}
                  />
                  <div>
                    <h3 className="line-clamp-1 text-lg font-semibold">
                      {item.game.name}
                    </h3>
                    <span className="text-gray-400">
                      {formatCurrency(item.game.price)}
                    </span>
                  </div>
                </Link>
                <div className="item flex flex-col space-y-2 sm:space-y-4">
                  <button
                    type="button"
                    className="rounded-md bg-yellow-500 px-3 py-1.5 text-white transition-colors duration-300 hover:bg-yellow-600 focus:outline-none"
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    className="rounded-md bg-red-500 px-3 py-1.5 text-white transition-colors duration-300 hover:bg-red-600 focus:outline-none"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default function Dashboard(): ReactElement {
  return (
    <div>
      <Section data={cartData} />
    </div>
  );
}
