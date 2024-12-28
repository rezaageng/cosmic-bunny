import type { ReactElement } from 'react';
import { AddGameForm } from '@/components/game-dashboard/add-game-form';

export default function AddGame(): ReactElement {
  return (
    <section className="m-4 max-w-screen-xl space-y-4 rounded-lg bg-zinc-900 p-4 sm:m-auto">
      <h1 className="text-2xl font-semibold">Add Game</h1>
      <AddGameForm />
    </section>
  );
}
