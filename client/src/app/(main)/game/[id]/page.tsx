import Image from 'next/image';
import type { ReactElement } from 'react';
import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';
import { getGame, getLibrary } from '@/services';
import { formatCurrency } from '@/lib/utils';
import { GameDescription } from '@/components/game/game-description';
import { GameActions } from '@/components/game/game-actions';

export default async function GamePage({
  params,
}: {
  params: { id: string };
}): Promise<ReactElement> {
  const token = cookies().get('token')?.value ?? '';

  const { id } = params;
  const { data } = await getGame(id);
  let isInLibrary = false;

  if (!data) {
    notFound();
  }

  if (token) {
    const library = await getLibrary({ token });

    isInLibrary = library.data.some((item) => item.game.id === data.id);
  }

  return (
    <section className="mx-auto max-w-screen-xl space-y-4 px-4">
      <h1 className="text-3xl font-bold sm:text-4xl">{data.name}</h1>
      <span>{data.publisher}</span>
      <div className="flex flex-col gap-8 sm:flex-row-reverse">
        <div className="flex-1">
          <div className="space-y-2 text-center sm:sticky sm:top-4">
            <Image
              src={data.header_img}
              alt={data.name}
              width={460}
              height={215}
              className="w-full rounded"
            />
            {!isInLibrary ? (
              <span className="block text-xl font-semibold">
                {formatCurrency(data.price)}
              </span>
            ) : null}
            <GameActions id={data.id} isInLibrary={isInLibrary} />
          </div>
        </div>
        <div className="w-full space-y-4 sm:w-[70%]">
          <Image
            src={data.image}
            width={1920}
            height={1080}
            alt={data.name}
            className="aspect-video w-full rounded"
          />
          <p>{data.short_description}</p>
          <GameDescription description={data.description} />
        </div>
      </div>
    </section>
  );
}
