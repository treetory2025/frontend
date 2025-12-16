"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useThemeStore } from "@/store/userStore";

export default function Header({ title }: { title: string }) {
  const router = useRouter();
  const theme = useThemeStore((s) => s.theme);

  const bgClass =
    theme === "SILENT_NIGHT"
      ? "bg-navy"
      : theme === "SNOWY_HILL"
        ? "bg-skyblue"
        : "bg-navy";
  return (
    <div
      className={`text-beige sticky top-0 z-1 box-content flex items-center gap-4 px-5 ${bgClass}`}
    >
      <button className="cursor-pointer" onClick={() => router.back()}>
        <ChevronLeft
          size={32}
          strokeWidth={3}
          className={`${theme === "SILENT_NIGHT" ? "text-beige" : "text-navy"}`}
        />
      </button>
      <p
        className={`text-title font-memoment select-none ${
          theme === "SILENT_NIGHT" ? "text-beige" : "text-navy"
        }`}
      >
        트리토리 <span className="text-green">{title}</span>
      </p>
    </div>
  );
}
