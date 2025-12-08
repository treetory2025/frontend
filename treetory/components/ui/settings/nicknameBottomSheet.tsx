"use client";

import { BottomSheet } from "@/components/commons/BottomSheet";
import { BottomSheetProps } from "@/types/ui";
import {
  ActionButton,
  CancleButton,
  XButton,
} from "@/components/commons/Button";
import { useUserStore } from "@/store/useStore";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

export default function NicknameBottomSheet({
  isOpen,
  onClose,
}: BottomSheetProps) {
  const user = useUserStore((s) => s.user);
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    if (isOpen) {
      setNickname(user?.nickname || "");
    }
  }, [isOpen, user?.nickname]);

  const onHandleXButton = () => {
    setNickname(user?.nickname || "");
  };

  const onChangeNickname = async () => {
    console.log("닉네임 변경 api 요청");
    const res = await apiFetch(`/api/members/nickname`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ nickname }),
    });

    if (!res.ok) {
      console.error("닉네임 변경 실패");
    }

    const data = await res.json();
    useUserStore((s) => s.setUser({ nickname: data.nickname }));
    onClose();
  };

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} className="gap-12">
      <h3 className="text-subtitle md:text-title text-primary">
        닉네임 <span className="text-green">변경</span>
      </h3>
      <div className="border-green text-body text-fg-primary w-full border-b-4">
        <p className="text-caption md:text-body text-muted-navy mb-2">닉네임</p>
        <div className="relative">
          <input
            placeholder={nickname}
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="p-2.5 focus:outline-none"
          />
          <XButton onClick={onHandleXButton} />
        </div>
      </div>
      <div className="flex w-full flex-col gap-2">
        <ActionButton onClick={onChangeNickname}>변경</ActionButton>
        <CancleButton onClick={onClose} />
      </div>
    </BottomSheet>
  );
}
