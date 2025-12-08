"use client";

import { BottomSheet } from "@/components/commons/BottomSheet";
import { BottomSheetProps } from "@/types/ui";
import {
  ActionButton,
  CancleButton,
  XButton,
} from "@/components/commons/Button";
import { useUserStore } from "@/store/useStore";
import { useEffect, useMemo, useState } from "react";
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

  // 6글자 입력 제한
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length > 6) return;
    setNickname(value);
  };

  // 변경 버튼 활성화 조건
  const isDisabled = useMemo(() => {
    const original = user?.nickname || "";
    return nickname.length === 0 || nickname === original;
  }, [nickname, user?.nickname]);

  // 닉네임 변경
  const onChangeNickname = async () => {
    if (isDisabled) return;

    const res = await apiFetch(`/api/members/nickname`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ nickname }),
    });

    if (!res.ok) {
      console.error("닉네임 변경 실패");
      return;
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
      <div className="text-body text-fg-primary w-full space-y-2">
        <p className="text-caption md:text-body text-muted-navy mb-2">닉네임</p>
        <div className="border-green relative border-b-4">
          <input
            placeholder={nickname}
            value={nickname}
            maxLength={6}
            onChange={onChangeInput}
            className="p-2.5 focus:outline-none"
          />
          <XButton onClick={onHandleXButton} />
        </div>
        <p className="text-muted-navy">글자수 : {nickname.length} / 6</p>
      </div>
      <div className="flex w-full flex-col gap-2">
        <ActionButton onClick={onChangeNickname} disabled={isDisabled}>
          변경
        </ActionButton>
        <CancleButton onClick={onClose} />
      </div>
    </BottomSheet>
  );
}
