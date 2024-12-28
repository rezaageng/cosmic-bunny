'use client';

import { useEffect, type ReactNode } from 'react';
import { useShallow } from 'zustand/shallow';
import { X } from 'lucide-react';
import { useToastStore } from '@/store/toast';

export function Toast(): ReactNode {
  const [message, isOpen, setMessage, setIsOpen] = useToastStore(
    useShallow((state) => [
      state.message,
      state.isOpen,
      state.setMessage,
      state.setIsOpen,
    ]),
  );

  useEffect(() => {
    const closeToast = setTimeout(() => {
      setIsOpen(false);
      setMessage('');
    }, 3000);

    return () => {
      clearTimeout(closeToast);
    };
  }, [message, setIsOpen, setMessage]);

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-14 right-0 z-50 m-4 flex w-full max-w-72 items-center justify-between rounded-lg border border-white/25 bg-zinc-900 p-4 sm:bottom-0">
      <p>{message}</p>
      <button
        type="button"
        onClick={() => {
          setIsOpen(false);
          setMessage('');
        }}
      >
        <X />
      </button>
    </div>
  );
}
