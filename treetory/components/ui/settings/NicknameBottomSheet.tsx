"use client";

import { BottomSheet } from "@/components/commons/BottomSheet";
import { BottomSheetProps } from "@/types/ui";
import {
  ActionButton,
  CancleButton,
  XButton,
} from "@/components/commons/Button";
import { useUserStore } from "@/store/userStore";
import { useEffect, useMemo, useState } from "react";
import { apiFetch } from "@/lib/api";

export default function NicknameBottomSheet({
  isOpen,
  onClose,
}: BottomSheetProps) {
  const user = useUserStore((s) => s.user);
  const hasHydrated = useUserStore((s) => s._hasHydrated);
  const setUser = useUserStore.getState().setUser;

  const [nickname, setNickname] = useState("");

  useEffect(() => {
    if (isOpen && hasHydrated) {
      setNickname(user?.nickname || "");
    }
  }, [isOpen, user?.nickname, hasHydrated]);

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
    try {
      const res = await apiFetch(`/api/members/nicknames`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ nickname }),
      });

      if (!res.ok) {
        if (res.status === 400) {
          alert("유효하지 않는 닉네임입니다.");
          return;
        }
        console.error("닉네임 변경 실패", res);
        return;
      }

      // 닉네임 변경 후 최신 사용자 정보 재조회
      try {
        const meRes = await apiFetch(`/api/members/me`, {
          credentials: "include",
        });
        if (meRes.ok) {
          const meData = await meRes.json();
          const me = meData?.body ?? meData;
          setUser(me);
        }
      } catch (error) {
        // 재조회 실패 시에도 입력한 닉네임으로 로컬 상태 업데이트
        console.error("닉네임 변경 후 정보 조회 실패", error);
      }

      console.log("닉네임 변경 성공!");
      onClose();
    } catch (error) {
      console.error(error);
    }
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
