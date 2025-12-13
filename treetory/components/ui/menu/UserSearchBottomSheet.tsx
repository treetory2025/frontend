"use client";

import { BottomSheet } from "@/components/commons/BottomSheet";
import { useUserSearchSheet } from "@/store/useUserSearchSheet";

export default function UserSearchBottomSheet() {
  const { isOpen, close } = useUserSearchSheet();

  return (
    <BottomSheet isOpen={isOpen} onClose={close}>
      <h2>사용자 찾기 </h2>
    </BottomSheet>
  );
}
