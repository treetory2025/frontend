"use client";

import Header from "@/components/commons/Header";
import { usePathname } from "next/navigation";
import { useOwnerStore } from "@/store/userStore";

export default function HeaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isTreePage = pathname.startsWith("/tree");

  // Zustand store
  const { owner, _hasHydrated } = useOwnerStore();

  // Hydration 전에 렌더하면 깜빡임 발생 → 방지
  if (!_hasHydrated) return null;

  // tree 페이지이고 owner가 있을 때만 배경 적용
  const bgClass =
    isTreePage && owner
      ? owner.treeBackground === "SILENT_NIGHT"
        ? "bg-navy"
        : "bg-skyblue"
      : "";

  return (
    <div className={`flex h-full flex-col justify-start gap-8 ${bgClass}`}>
      <header>
        <Header />
      </header>

      {children}
    </div>
  );
}
