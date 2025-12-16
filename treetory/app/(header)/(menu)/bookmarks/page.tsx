"use client";

import { Suspense } from "react";
import BookmarksPage from "@/app/(header)/(menu)/bookmarks/BookmarksPage";
import { useUserStore } from "@/store/userStore";
import { useAlert } from "@/hooks/useAlert";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const user = useUserStore((s) => s.user);
  const alert = useAlert();
  if (!user) {
    alert("로그인이 필요합니다.", () => router.back());
  }
  return (
    <>
      <BookmarksPage />
    </>
  );
}
