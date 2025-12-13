"use client";

import { BottomSheet } from "@/components/commons/BottomSheet";
import { useMemberSearchSheet } from "@/store/useMemberSearchSheet";
import { XIcon } from "lucide-react";
import MemberSearchSection from "./memberSearchSection";

export default function MemberSearchBottomSheet() {
  const { isOpen, close } = useMemberSearchSheet();

  return (
    <BottomSheet isOpen={isOpen} onClose={close}>
      <div className="text-fg-primary flex w-full items-center justify-between">
        <h1 className="text-heading text-start leading-none font-bold">
          사용자 <span className="text-green">검색</span>
        </h1>
        <button
          className="text-beige bg-green h-full cursor-pointer rounded-full p-2"
          onClick={close}
        >
          <XIcon size={16} strokeWidth={3} />
        </button>
      </div>
      <MemberSearchSection />
    </BottomSheet>
  );
}
