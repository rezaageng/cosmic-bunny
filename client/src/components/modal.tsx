'use client';

import type { ReactNode } from 'react';
import { useShallow } from 'zustand/shallow';
import { useModalStore } from '@/store/modal';
import { Button } from '@/components/button';

export function Modal(): ReactNode {
  const [isOpen, content, variant, confirmAction, setIsOpen] = useModalStore(
    useShallow((state) => [
      state.isOpen,
      state.content,
      state.variant,
      state.confirmAction,
      state.setIsOpen,
    ]),
  );

  const cancelHandler = (): void => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed left-0 top-0 z-50 grid h-svh w-full place-content-center bg-black/75 p-4">
      <div className="w-full max-w-lg space-y-8 rounded-lg bg-background p-6">
        <p className="text-lg font-semibold">{content}</p>
        {variant === 'confirm' ? (
          <div className="flex justify-end gap-2">
            <Button
              onClick={cancelHandler}
              variant="outline"
              className="w-auto text-sm"
            >
              Cancel
            </Button>
            <Button
              onClick={async () => {
                if (confirmAction) await confirmAction();
              }}
              className="w-auto text-sm"
            >
              Continue
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
