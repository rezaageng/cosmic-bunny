import { create } from 'zustand';

interface ModalState {
  isOpen: boolean;
  content: string;
  variant?: 'alert' | 'confirm';
  confirmAction?: () => void | Promise<void>;
  setIsOpen: (isOpen: boolean) => void;
  setContent: (content: string) => void;
  setVariant: (variant: 'alert' | 'confirm') => void;
  setConfirmAction: (
    confirmAction: () => void | Promise<void>,
  ) => void | Promise<void>;
}

export const useModalStore = create<ModalState>()((set) => ({
  content: '',
  isOpen: false,
  variant: 'confirm',
  confirmAction: undefined,
  setIsOpen: (isOpen) => {
    set({ isOpen });
  },
  setContent: (content) => {
    set({ content });
  },
  setVariant: (variant) => {
    set({ variant });
  },
  setConfirmAction: (confirmAction) => {
    set({ confirmAction });
  },
}));
