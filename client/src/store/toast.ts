import { create } from 'zustand';

interface ToastState {
  message: string;
  isOpen: boolean;
  setMessage: (message: string) => void;
  setIsOpen: (isOpen: boolean) => void;
}

export const useToastStore = create<ToastState>()((set) => ({
  message: '',
  isOpen: false,
  setMessage: (message) => {
    set({ message });
  },
  setIsOpen: (isOpen) => {
    set({ isOpen });
  },
}));
