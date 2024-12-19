import Image from 'next/image';
import type { ReactElement } from 'react';
import { notFound } from 'next/navigation';
import { getGame } from '@/services';
import { Button } from '@/components/button';
import { formatCurrency } from '@/lib/utils';
import { GameDescription } from '@/components/game/game-description';

export default async function GamePage({
  params,
}: {
  params: { id: string };
}): Promise<ReactElement> {
  const { id } = params;

  const { data } = await getGame(id);

  if (!data) {
    notFound();
  }

  return (
    <section className="mx-auto max-w-screen-xl space-y-4 px-4">
      <h1 className="text-3xl font-bold sm:text-4xl">{data.name}</h1>
      <span>{data.publisher}</span>
      <div className="flex flex-col gap-8 sm:flex-row-reverse">
        <div>
          <div className="space-y-2 text-center sm:sticky sm:top-4">
            <Image
              src={data.image}
              alt={data.name}
              width={460}
              height={215}
              className="w-full rounded"
            />
            <span className="block text-xl font-semibold">
              {formatCurrency(data.price)}
            </span>
            <Button>Buy</Button>
            <Button variant="secondary">Add To Cart</Button>
            <Button variant="secondary">Add To Wishlist</Button>
          </div>
        </div>
        <div className="w-full space-y-4 sm:w-[70%]">
          <Image
            src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2161700/ss_7017244fb8319ba927a0ef414959b95a6164356f.1920x1080.jpg?t=1725556209"
            width={1920}
            height={1080}
            alt={data.name}
            className="aspect-video w-full rounded"
          />
          <p>
            Dive into the Dark Hour and awaken the depths of your heart. Persona
            3 Reload is a captivating reimagining of the genre-defining RPG,
            reborn for the modern era with cutting-edge graphics and gameplay.
          </p>
          <GameDescription description={data.description} />
        </div>
      </div>
    </section>
  );
}
