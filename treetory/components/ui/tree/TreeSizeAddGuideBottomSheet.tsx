"use client";

import { BottomSheet } from "@/components/commons/BottomSheet";
import { BottomSheetProps } from "@/types/ui";
import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ActionButton, CancleButton } from "@/components/commons/Button";
import { CircleAlert, Play } from "lucide-react";
import { apiFetch } from "@/lib/api";
import { useOwner } from "@/app/(header)/tree/[uuid]/tree-context";

type TreeSizeAddGuideBottomSheetProps = BottomSheetProps & {
  treeSize: number;
};

export default function TreeSizeAddGuideBottomSheet({
  treeSize,
  isOpen,
  onClose,
}: TreeSizeAddGuideBottomSheetProps) {
  if (!treeSize) return null;
  const { refreshOwner } = useOwner();

  if (treeSize === 10) {
    return (
      <BottomSheet isOpen={isOpen} onClose={onClose}>
        <div className="border-green flex w-full flex-col items-center gap-1 border-b-2 pb-4">
          <h3 className="text-subtitle text-fg-primary w-fullfont-bold">
            트리 사이즈가 <span className="text-red">최대치에 도달했어요!</span>
          </h3>
        </div>
        <div className="flex flex-col items-center justify-center gap-1">
          <div className="text-body text-fg-primary flex items-center gap-2">
            <p>현재 트리 사이즈</p>
            <p className="font-bold">{treeSize}</p>
          </div>
          <p className="text-body text-fg-primary pb-4 font-bold">
            더 이상 추가할 수 없습니다.
          </p>
          <p className="text-caption text-fg-tertiary">
            최대 추가할 수 있는 트리 사이즈는
            <span className="font-bold"> 10</span>입니다
          </p>
        </div>
        <CancleButton onClick={onClose} />
      </BottomSheet>
    );
  }

  const [isPreview, setIsPreview] = useState(false);
  const [direction, setDirection] = useState<1 | -1>(1);

  const nextTreeSize = treeSize + 1;

  const handlePreviewClick = () => {
    if (isPreview) return; // 연타 방지
    setDirection(1); // 좌 → 우
    setIsPreview(true);
  };

  // 자동 복귀
  useEffect(() => {
    if (!isPreview) return;

    const timer = setTimeout(() => {
      setDirection(-1); // 우 → 좌
      setIsPreview(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, [isPreview]);

  const slideVariants: {} = {
    enter: (direction: 1 | -1) => ({
      x: direction === 1 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
    exit: (direction: 1 | -1) => ({
      x: direction === 1 ? "-100%" : "100%",
      opacity: 0,
      transition: {
        duration: 0.6,
        ease: "easeIn",
      },
    }),
  };

  // 사이즈 추가 api 전송
  const increaseTreeSize = async () => {
    try {
      const res = await apiFetch(`/api/trees/size`, {
        method: "PATCH",
        credentials: "include",
      });

      if (res.ok) {
        await refreshOwner();
        return;
      }

      switch (res.status) {
        case 400:
          alert("트리 사이즈가 최대를 넘어 더 이상 추가할 수 없습니다.");
          break;
        case 401:
          alert("권한이 없는 사용자가 트리 사이즈를 추가하려고 했습니다.");
          break;
        default:
          alert("트리 사이즈 변경 중 알 수 없는 오류가 발생했습니다.");
          console.log("트리 사이즈 변경 실패 ", res);
      }
    } catch (error) {
      console.error("트리 사이즈 변경 중 네트워크 에러", error);
      alert("네트워크 오류로 트리 사이즈 변경에 실패했습니다.");
    }
  };

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <div className="flex w-full flex-col items-center gap-6 text-center">
        <h3 className="text-subtitle text-fg-primary border-green w-full border-b-2 pb-2 font-bold">
          트리 사이즈를 <span className="text-green">추가</span>할까요?
        </h3>
        <div className="flex flex-col items-center justify-center gap-1">
          <div className="text-body text-fg-primary flex items-center gap-2">
            <p>현재 트리 사이즈</p>
            <p className="font-bold">{treeSize}</p>
          </div>
          <p className="text-caption text-fg-tertiary">
            최대 추가할 수 있는 트리 사이즈는
            <span className="font-bold">10</span>입니다
          </p>
        </div>
      </div>
      {/* 콘텐츠 */}
      <div className="relative flex flex-col items-center gap-4">
        <div className="bg-navy relative h-70 w-60 overflow-hidden rounded-lg">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={isPreview ? `next-${nextTreeSize}` : `current-${treeSize}`}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0"
            >
              <Image
                src={
                  isPreview
                    ? `/images/theme/tree/NORMAL/Size${nextTreeSize}.png`
                    : `/images/theme/tree/NORMAL/Size${treeSize}.png`
                }
                alt="트리 이미지"
                fill
                className="object-contain p-2"
                priority
              />
            </motion.div>
          </AnimatePresence>
        </div>
        <button
          onClick={handlePreviewClick}
          className="text-beige bg-muted-navy text-button pointer-cursor absolute right-4 bottom-7 z-10 cursor-pointer rounded-full p-2 font-medium transition active:scale-95"
        >
          <Play size={16} strokeWidth={3} />
        </button>
        <p className="text-caption text-fg-tertiary">
          버튼을 클릭하면 다음 사이즈를 확인할 수 있습니다.
        </p>
      </div>

      <div className="flex w-80 flex-col gap-4">
        <div className="text-red flex flex-col items-center justify-center gap-1">
          <div className="flex items-center gap-2">
            <CircleAlert size={16} />
            <p className="text-caption font-bold">
              추가하면 이전 트리 사이즈로 되돌릴 수 없습니다!
            </p>
          </div>
          <ActionButton onClick={increaseTreeSize}>추가하기</ActionButton>
        </div>
        <CancleButton onClick={onClose} />
      </div>
    </BottomSheet>
  );
}
