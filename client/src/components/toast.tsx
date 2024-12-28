'use client';

import { useEffect, type ReactNode } from 'react';
import { useShallow } from 'zustand/shallow';
import { CircleDashed, X } from 'lucide-react';
import { motion } from 'motion/react';
import { useToastStore } from '@/store/toast';

export function Toast(): ReactNode {
  const [message, isOpen, variant, setMessage, setIsOpen] = useToastStore(
    useShallow((state) => [
      state.message,
      state.isOpen,
      state.variant,
      state.setMessage,
      state.setIsOpen,
    ]),
  );

  useEffect(() => {
    if (variant === 'loading') return;

    const closeToast = setTimeout(() => {
      setIsOpen(false);
      setMessage('');
    }, 3000);

    return () => {
      clearTimeout(closeToast);
    };
  }, [message, setIsOpen, setMessage, variant]);

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-14 right-0 z-50 m-4 flex w-full max-w-72 items-center justify-between rounded-lg border border-white/25 bg-zinc-900 p-4 sm:bottom-0">
      <p>{message}</p>
      {variant === 'loading' ? (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1 }}
        >
          <CircleDashed />
        </motion.div>
      ) : (
        <button
          type="button"
          onClick={() => {
            setIsOpen(false);
            setMessage('');
          }}
        >
          <X />
        </button>
      )}
    </div>
  );
}
