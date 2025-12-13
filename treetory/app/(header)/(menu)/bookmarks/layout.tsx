"use client";

import { useThemeStore } from "@/store/userStore";

export default function Layout({ children }: { children: React.ReactNode }) {
  const theme = useThemeStore((s) => s.theme);

  const bgClass =
    theme === "SILENT_NIGHT"
      ? "bg-navy"
      : theme === "SNOWY_HILL"
        ? "bg-skyblue"
        : "bg-navy"; // tree 아닌 페이지 기본 배경
  return <div className={`h-full w-full ${bgClass} `}>{children}</div>;
}
