import { RefObject, useEffect } from "react";

type Options = {
  isOpen: boolean;
  onClose: () => void;
};

export default function useCloseOnOutsideOrEsc<T extends HTMLElement>(
  ref: RefObject<T | null>,
  { isOpen, onClose }: Options,
) {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeydown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [isOpen, onClose]);
}
