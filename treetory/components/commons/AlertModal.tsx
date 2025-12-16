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
      <div className="w-[320px] rounded-lg bg-white p-6 text-center">
        <p className="mb-4">{message}</p>
        <button
          onClick={handleConfirm}
          className="rounded bg-blue-500 px-4 py-2 text-white"
        >
          확인
        </button>
      </div>
    </div>
  );
}
