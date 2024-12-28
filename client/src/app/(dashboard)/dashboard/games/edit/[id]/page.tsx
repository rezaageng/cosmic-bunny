import { notFound } from 'next/navigation';
import { type ReactElement } from 'react';
import { getGame } from '@/services';
import { EditGameForm } from '@/components/game-dashboard/edit-game-form';

export default async function UpdatePage({
  params,
}: {
  params: { id: string };
}): Promise<ReactElement> {
  const { data } = await getGame(params.id);

  if (!data) {
    notFound();
  }

  return (
    <section className="m-auto max-w-screen-xl p-4">
      <div className="space-y-4 rounded-lg bg-zinc-900 p-4">
        <h1 className="text-2xl font-semibold">Update Game</h1>
        <EditGameForm game={data} />
      </div>
    </section>
  );
}
