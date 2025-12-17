import { useModalStore } from "@/store/useModalStore";

export default function AlertModal() {
  const { isOpen, message, onConfirm, closeModal } = useModalStore();

  if (!isOpen) return null;

  const handleConfirm = () => {
    closeModal();
    onConfirm?.();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-beige flex w-[320px] flex-col items-center justify-center gap-8 rounded-lg p-6 text-center">
        <p className="text-body text-green border-green w-full border-b-2 pb-2 text-lg font-bold">
          안내
        </p>
        <p className="text-body pt-2">{message}</p>
        <button
          onClick={handleConfirm}
          className="bg-green text-beige text-button cursor-pointer rounded-lg px-16 py-2"
        >
          확인
        </button>
      </div>
    </div>
  );
}
