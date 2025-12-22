"use client";

import Image from "next/image";
import snowmanIcon from "@/public/icons/snowman.png";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useThemeStore } from "@/store/userStore";

export default function PageHeading({ title }: { title: string }) {
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
      className={`text-beige sticky top-0 z-1 box-content flex items-center gap-4 border-b-8 px-5 pb-10 ${bgClass}`}
    >
      <button className="cursor-pointer" onClick={() => router.back()}>
        <ChevronLeft
          size={32}
          strokeWidth={3}
          className={`${theme === "SILENT_NIGHT" ? "text-beige" : "text-navy"}`}
        />
      </button>
      <p
        className={`text-beige text-title font-memoment select-none ${
          theme === "SILENT_NIGHT" ? "text-beige" : "text-navy"
        }`}
      >
        트리토리 <span className="text-green">{title}</span>
      </p>
      <Image
        alt="Snowman Decoration"
        src={snowmanIcon}
        width={76}
        height={76}
        className="absolute right-0 -bottom-5 z-10"
      />
    </div>
  );
}
