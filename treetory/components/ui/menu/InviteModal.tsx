"use client";

import { useAlert } from "@/hooks/useAlert";
import { useInviteModalStore } from "@/store/useModalStore";
import { useUserStore } from "@/store/userStore";
import { X } from "lucide-react";

export default function InviteModal() {
  const { isOpen, closeModal } = useInviteModalStore();
  const alert = useAlert();
  const user = useUserStore((s) => s.user);

  if (!isOpen || !user) return null;
  const uuid = user.uuid;

  const handleConfirm = () => {
    closeModal();
  };

  const handleCopyLink = () => {
    closeModal();
    const { origin } = window.location; // 현재 도메인
    const inviteUrl = `${origin}/tree/${uuid}`;
    navigator.clipboard.writeText(inviteUrl);

    alert("초대 링크가 복사되었습니다!");
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
      <div className="bg-muted-navy flex w-[348px] flex-col items-center justify-center gap-4 rounded-lg px-4 py-4 text-center md:w-[480px] md:px-8 md:py-8">
        <div className="text-navy flex w-full justify-end">
          <button className="cursor-pointer" onClick={handleConfirm}>
            <X size={24} />
          </button>
        </div>
        <p className="text-body text-beige w-full text-lg font-bold">
          트리토리 초대
        </p>
        <p className="text-body text-navy">
          나의 트리토리 초대 링크를 복사합니다.
        </p>
        <button
          onClick={handleCopyLink}
          className="bg-green text-beige text-button w-full cursor-pointer rounded-lg py-3 font-bold"
        >
          링크 복사
        </button>
      </div>
    </div>
  );
}
