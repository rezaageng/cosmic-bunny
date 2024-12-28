import { create } from 'zustand';

interface ToastState {
  message: string;
  isOpen: boolean;
  variant: 'message' | 'loading';
  setMessage: (message: string) => void;
  setIsOpen: (isOpen: boolean) => void;
  setVariant: (variant: 'message' | 'loading') => void;
}

export const useToastStore = create<ToastState>()((set) => ({
  message: '',
  isOpen: false,
  variant: 'message',
  setMessage: (message) => {
    set({ message });
  },
  setIsOpen: (isOpen) => {
    set({ isOpen });
  },
  setVariant: (variant) => {
    set({ variant });
  },
}));
