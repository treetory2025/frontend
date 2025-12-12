"use client";

import { BottomSheetProps } from "@/types/ui";
import type { Ornarment } from "@/types/ornarment";
import { BottomSheet } from "@/components/commons/BottomSheet";
import Image from "next/image";
import { ActionButton } from "@/components/commons/Button";
import { useOwner } from "@/app/(header)/tree/[uuid]/tree-context";
import { isUser } from "@/lib/auth";

import ChatCircle from "@/public/icons/Chat_Circle_Dots.png";
import CloseCircle from "@/public/icons/Close_Circle.png";
import { MoveRight } from "lucide-react";
import NoticeMessage from "./NoticeMessage";
import { isChristmas2025InKorea } from "@/lib/date";

type OrnamentBottomSheetProps = BottomSheetProps & {
  ornament: Ornarment | null;
};

export default function OrnamentBottomSheet({
  isOpen,
  onClose,
  ornament,
}: OrnamentBottomSheetProps) {
  if (!ornament) return null;
  const { owner, uuid } = useOwner();
  const [year, month, day] = ornament.createdDate.split(".");
  const isOwner = owner ? isUser(uuid) : false;
  const isChristmas = isChristmas2025InKorea();
  // const isChristmas = true;

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
            disabled={true}
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
    </BottomSheet>
  );
}
