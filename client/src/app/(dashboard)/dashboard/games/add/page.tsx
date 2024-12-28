import type { ReactElement } from 'react';
import { AddGameForm } from '@/components/game-dashboard/add-game-form';

export default function AddGame(): ReactElement {
  return (
    <section className="m-auto max-w-screen-xl p-4">
      <div className="space-y-4 rounded-lg bg-zinc-900 p-4">
        <h1 className="text-2xl font-semibold">Add Game</h1>
        <AddGameForm />
      </div>
    </section>
  );
}
