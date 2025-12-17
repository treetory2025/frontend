import { create } from "zustand";

interface ModalState {
  isOpen: boolean;
  message: string;
  onConfirm?: () => void;
  openModal: (params: { message: string; onConfirm?: () => void }) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  message: "",
  onConfirm: undefined,

  openModal: ({ message, onConfirm }) =>
    set({
      isOpen: true,
      message,
      onConfirm,
    }),

  closeModal: () =>
    set({
      isOpen: false,
      message: "",
      onConfirm: undefined,
    }),
}));

interface InviteModalState {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useInviteModalStore = create<InviteModalState>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));
