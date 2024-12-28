'use client';

import type { ReactElement } from 'react';
import { useShallow } from 'zustand/shallow';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/button';
import { useModalStore } from '@/store/modal';
import { deleteGames } from '@/lib/actions';

export function GameCardActions({ id }: { id: number }): ReactElement {
  const [setIsOpen, setContent, setVariant, setConfirmAction] = useModalStore(
    useShallow((state) => [
      state.setIsOpen,
      state.setContent,
      state.setVariant,
      state.setConfirmAction,
    ]),
  );

  const router = useRouter();

  const deleteHandler = async (): Promise<void> => {
    setIsOpen(true);
    setContent('Are you sure you want to delete this game?');
    setVariant('confirm');
    await setConfirmAction(async () => {
      await deleteGames(id);
      setIsOpen(false);
    });
  };

  return (
    <div className="flex items-center justify-end gap-2 text-lg font-semibold">
      <Button
        onClick={() => {
          router.push(`/dashboard/games/edit/${id.toString()}`);
        }}
        className="w-auto px-4 py-2 text-sm"
      >
        Update
      </Button>
      <Button
        onClick={deleteHandler}
        variant="danger"
        className="w-auto text-sm"
      >
        Delete
      </Button>
    </div>
  );
}
