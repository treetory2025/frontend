import { useModalStore } from "@/store/useModalStore";

export const useAlert = () => {
  const openModal = useModalStore((s) => s.openModal);

  return (message: string, onConfirm?: () => void) => {
    openModal({ message, onConfirm });
  };
};
