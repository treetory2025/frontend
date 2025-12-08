import { X } from "lucide-react";

type ButtonProps = {
  onClick: () => void;
  children?: React.ReactNode;
  disabled?: boolean;
};

export function ActionButton({ onClick, children, disabled }: ButtonProps) {
  return (
    <button
      className={`bg-green text-beige text-button md:text-body flex w-full items-center justify-center rounded-md py-2 md:py-3 ${disabled ? "cursor-now-allowed opacity-20" : "cursor-pointer"}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export function CancleButton({ onClick }: ButtonProps) {
  return (
    <button
      className="bg-muted-navy text-beige text-button md:text-body flex w-full cursor-pointer items-center justify-center rounded-md py-2 md:py-3"
      onClick={onClick}
    >
      취소
    </button>
  );
}

// input x button
export function XButton({ onClick }: ButtonProps) {
  return (
    <button
      className="bg-fg-secondary absolute top-1/2 right-4 flex size-7 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full md:size-8"
      onClick={onClick}
    >
      <X className="text-beige pointer-events-none size-5 md:size-6" />
    </button>
  );
}
