"use client";

import { BottomSheetProps } from "@/types/ui";
import type { Ornarment } from "@/types/ornarment";
import { BottomSheet } from "@/components/commons/BottomSheet";
import Image from "next/image";
import {
  ActionButton,
  CancleButton,
  DeleteeButton,
} from "@/components/commons/Button";
import { useOwner } from "@/app/(header)/tree/[uuid]/tree-context";
import { isUser } from "@/lib/auth";

import ChatCircle from "@/public/icons/Chat_Circle_Dots.png";
import CloseCircle from "@/public/icons/Close_Circle.png";
import { Info, MoveRight } from "lucide-react";
import NoticeMessage from "./NoticeMessage";
import { isChristmas2025InKorea } from "@/lib/date";
import { useState } from "react";
import { apiFetch } from "@/lib/api";
import { useOrnamentInfoMdalStore } from "@/store/useModalStore";

type OrnamentBottomSheetProps = BottomSheetProps & {
  ornament: Ornarment | null;
};

export default function OrnamentBottomSheet({
  isOpen,
  onClose,
  ornament,
}: OrnamentBottomSheetProps) {
  const { owner } = useOwner();

  const isOwner = owner ? isUser() : false;
  const isChristmas = isChristmas2025InKorea();

  const openModal = useOrnamentInfoMdalStore((s) => s.openModal);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  if (!ornament) return null;
  const [year, month, day] = ornament.createdDate.split(".");

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center gap-6">
        <div className="bg-muted-bg relative flex size-40 items-center justify-center rounded-full">
          <div className="relative size-30 overflow-hidden rounded-full">
            <Image
              alt="선택된 장식 이미지"
              src={ornament.imgUrl}
              width={120}
              height={120}
              className="object-cover"
              crossOrigin="anonymous"
            />
          </div>
          <button
            className="text-body text-beige bg-muted-navy border-beige absolute right-0 bottom-0 flex size-8 cursor-pointer items-center justify-center rounded-full border-2 select-none"
            onClick={() => openModal(ornament.ornamentId)}
          >
            i
          </button>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-body text-green font-bold">방문자</p>
          <h3 className="text-heading text-fg-primary">
            {ornament.writerNickname}님
          </h3>
          <p className="text-caption text-muted-navy pt-1">
            {year}년 {month}월 {day}일에 장식을 등록하였습니다.
          </p>
        </div>
      </div>

      {isOwner && (
        <div className="flex w-full flex-col">
          {!isChristmas && <NoticeMessage />}

          <button
            disabled={!isChristmas}
            className={`flex w-full items-center justify-between px-4 py-2 ${!isChristmas ? "cursor-not-allowed opacity-30" : "cursor-pointer"} text-fg-secondary`}
          >
            <div className="text-body flex items-center gap-3 font-bold">
              <Image
                src={ChatCircle}
                alt="편지 조회 아이콘"
                className="size-8"
              />
              <p className="md:text-subtitle leading-none select-none">
                작성된 편지 읽기
              </p>
            </div>
            <MoveRight size={28} />
          </button>
          <div className="my-1 flex items-center px-3">
            <div className="bg-green h-0.5 w-full" />
          </div>
          <button
            className="text-fg-secondary flex w-full cursor-pointer items-center justify-between px-4 py-2"
            onClick={() => setIsDeleteOpen(true)}
          >
            <div className="text-body flex items-center gap-3 font-bold">
              <Image
                src={CloseCircle}
                alt="장식 삭제 아이콘"
                className="size-8"
              />
              <p className="md:text-subtitle leading-none select-none">
                장식 삭제
              </p>
            </div>
          </button>
        </div>
      )}
      <div className="flex w-full flex-col gap-2">
        <ActionButton onClick={onClose}>확인</ActionButton>
      </div>
      <DeleteBottomSheet
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        placedOrnamentId={ornament.placedOrnamentId}
        isDone={onClose}
      />
    </BottomSheet>
  );
}

type DeleteBottomSheet = BottomSheetProps & {
  placedOrnamentId: number;
  isDone: () => void;
};

export function DeleteBottomSheet({
  isOpen,
  onClose,
  placedOrnamentId,
  isDone,
}: DeleteBottomSheet) {
  const { refreshOwner } = useOwner();

  // api 서버 수정 후 반영 예정
  const deleteOrnarment = async () => {
    try {
      const res = await apiFetch(`/api/trees/ornaments/${placedOrnamentId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (res.ok) {
        await refreshOwner();
        onClose();
        isDone();
        return;
      }

      if (!res.ok && res.status === 403) {
        alert("삭제 권한이 없습니다.");
        return;
      } else {
        console.log("api 요청 실패", res.status, res.body);
      }
    } catch (error) {
      console.error("삭제 실패", error);
    }
  };
  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} className="gap-12">
      <h1 className="text-heading text-fg-primary font-bold">
        해당 장식을 <span className="text-red">삭제</span>할까요?
      </h1>
      <p className="text-body text-fg-secondary">
        삭제 시 등록된 장식 정보를 되돌릴 수 없습니다.
      </p>
      <div className="flex w-full flex-col gap-2">
        <DeleteeButton onClick={deleteOrnarment} />
        <CancleButton onClick={onClose} />
      </div>
    </BottomSheet>
  );
}
