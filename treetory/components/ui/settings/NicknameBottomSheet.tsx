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
import { Check, CircleCheckBig, Info } from "lucide-react";
import { useAlert } from "@/hooks/useAlert";

// 유효성검사
const NICKNAME_REGEX = /^[가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9_]+$/;

export default function NicknameBottomSheet({
  isOpen,
  onClose,
}: BottomSheetProps) {
  const user = useUserStore((s) => s.user);
  const hasHydrated = useUserStore((s) => s._hasHydrated);
  const setUser = useUserStore((s) => s.setUser);

  const [nickname, setNickname] = useState("");
  const alert = useAlert();

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

  // 실시간 유효성 검사
  const validation = useMemo(() => {
    if (nickname.length === 0) {
      return {
        type: "info",
        message: "닉네임을 입력해 주세요.",
      };
    }

    if (!NICKNAME_REGEX.test(nickname)) {
      return {
        type: "error",
        message: "한글, 영문, 숫자, _(언더바)만 사용할 수 있어요.",
      };
    }

    if (nickname === user?.nickname) {
      return {
        type: "info",
        message: "현재 사용 중인 닉네임이에요.",
      };
    }

    return {
      type: "success",
      message: "사용 가능한 닉네임이에요.",
    };
  }, [nickname, user?.nickname]);

  // 변경 버튼 활성화 조건
  const isDisabled = useMemo(() => {
    const original = user?.nickname || "";

    if (nickname.length === 0) return true;
    if (nickname === original) return true;
    if (validation.type === "error") return true;
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
          onClose();
          alert("유효하지 않는 닉네임입니다.");
          return;
        }
        onClose();
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
          alert("닉네임 변경 성공");
          onClose();
        }
      } catch (error) {
        console.error("닉네임 변경 후 정보 조회 실패", error);
        onClose();
      }
    } catch (error) {
      console.error(error);
      onClose();
    }
  };

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      className="gap-12 select-none"
    >
      <h3 className="text-subtitle md:text-title text-primary">
        닉네임 <span className="text-green">변경</span>
      </h3>

      <div className="text-body md:text-subtitle flex w-full flex-col gap-2 font-medium">
        <div className="flex w-full gap-3">
          <Check size={20} className="text-green" />
          <p className="text-fg-secondary text-center">
            닉네임은 <span className="font-bold">최대 6글자 </span>설정할 수
            있어요.
          </p>
        </div>
        <div className="flex w-full gap-3">
          <Check size={20} className="text-green" />
          <p className="text-fg-secondary text-center">
            <span className="font-bold">한글, 영어, 숫자, _만 </span>
            사용할 수 있어요.
          </p>
        </div>
      </div>
      <div className="text-body text-fg-primary w-full space-y-2">
        <p className="text-caption md:text-body text-fg-secondary mb-3">
          닉네임
        </p>
        <div className="border-green relative border-b-4">
          <input
            placeholder={nickname}
            value={nickname}
            maxLength={6}
            onChange={onChangeInput}
            className="focus:bg-green/10 w-full cursor-text rounded-md px-5 py-2.5 transition focus:outline-none"
          />
          <XButton onClick={onHandleXButton} />
        </div>

        <p className="text-fg-tertiary pt-1">
          글자수 : {nickname.length} / <span className="font-bold">6</span>
        </p>
      </div>
      <div className="text-caption md:text-body text-fg-tertiary flex flex-1 items-center gap-2 p-2">
        {validation.type === "error" && (
          <>
            <Info size={16} className="text-red" />
            <span className="text-red">{validation.message}</span>
          </>
        )}
        {validation.type === "info" && (
          <>
            <Info size={16} className="text-fg-tertiary" />
            <span className="text-fg-tertiary">{validation.message}</span>
          </>
        )}
        {validation.type === "success" && (
          <>
            <CircleCheckBig size={16} className="text-green" />
            <span className="text-green">{validation.message}</span>
          </>
        )}
      </div>

      <div className="flex w-full flex-col gap-4">
        <ActionButton onClick={onChangeNickname} disabled={isDisabled}>
          변경
        </ActionButton>
        <CancleButton onClick={onClose} />
      </div>
    </BottomSheet>
  );
}
