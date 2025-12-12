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
import { MoveRight } from "lucide-react";
import NoticeMessage from "./NoticeMessage";
import { isChristmas2025InKorea } from "@/lib/date";
import { useState } from "react";
import { apiFetch } from "@/lib/api";

type OrnamentBottomSheetProps = BottomSheetProps & {
  ornament: Ornarment | null;
};

export default function OrnamentBottomSheet({
  isOpen,
  onClose,
  ornament,
}: OrnamentBottomSheetProps) {
  const { owner, uuid } = useOwner();
  const isOwner = owner ? isUser(uuid) : false;
  const isChristmas = isChristmas2025InKorea();

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  if (!ornament) return null;
  const [year, month, day] = ornament.createdDate.split(".");

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center gap-6">
        <div className="bg-muted-bg relative flex size-30 items-center justify-center rounded-full">
          <div className="h-20 w-20 overflow-hidden rounded-full">
            <Image
              alt="선택된 장식 이미지"
              src={ornament.imgUrl}
              width={80}
              height={80}
              className="object-cover"
            />
          </div>
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
        <div className="flex w-full flex-col py-6">
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
          <div className="my-2 flex items-center px-3">
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
        ornamentId={ornament.ornamentId}
      />
    </BottomSheet>
  );
}

type DeleteBottomSheet = BottomSheetProps & { ornamentId: number };

export function DeleteBottomSheet({
  isOpen,
  onClose,
  ornamentId,
}: DeleteBottomSheet) {
  const { refreshOwner } = useOwner();
  const deleteOrnarment = async () => {
    try {
      const res = await apiFetch(`/api/trees/ornaments/${ornamentId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (res.ok) {
        console.log("장식 삭제 성공");
        refreshOwner;
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
