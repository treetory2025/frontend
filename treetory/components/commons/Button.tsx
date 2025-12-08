type ButtonProps = {
  onClick: () => void;
};

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
