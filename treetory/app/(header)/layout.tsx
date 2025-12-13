"use client";

import Header from "@/components/commons/Header";
import { useThemeStore } from "@/store/userStore";
import { usePathname } from "next/navigation";

export default function HeaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isTreeRoute = pathname.startsWith("/tree");

  const theme = useThemeStore((s) => s.theme);

  const bgClass = isTreeRoute
    ? theme === "SILENT_NIGHT"
      ? "bg-navy"
      : theme === "SNOWY_HILL"
        ? "bg-skyblue"
        : "bg-navy" // tree인데 아직 theme 없음
    : "bg-navy"; // tree 아닌 페이지 기본 배경
  return (
    <div
      className={`relative flex h-full w-full flex-col justify-start gap-8 ${bgClass}`}
    >
      <header>
        <Header />
      </header>

      {children}
    </div>
  );
}
