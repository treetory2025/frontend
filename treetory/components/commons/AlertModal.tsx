import { useModalStore } from "@/store/useModalStore";

export default function AlertModal() {
  const { isOpen, message, closeModal } = useModalStore();

  if (!isOpen) return null;

  return (
    <div>
      모달
      <p className="mb-4">{message}</p>
      <button onClick={closeModal}> 확인</button>
    </div>
  );
}
