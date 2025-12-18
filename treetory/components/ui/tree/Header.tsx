"use client";
import { useOwner } from "@/app/(header)/tree/[uuid]/tree-context";
import { useUserStore } from "@/store/userStore";
import { List, RotateCw } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { AddTreeButton } from "@/components//ui/tree/Button";
import { useThemeStore } from "@/store/userStore";
import { p } from "motion/react-client";

export default function TreeHeader() {
  const { owner, refreshOwner, uuid, openSizeSheet } = useOwner();
  const user = useUserStore().user;
  const router = useRouter();
  const pathname = usePathname();

  const isPlacement = pathname.endsWith("/placement");

  const theme = useThemeStore((s) => s.theme);
  const isOwner = user?.uuid === uuid;

  const textColor = theme === "SILENT_NIGHT" ? "text-beige" : "text-navy";
  const welcomeStr = isOwner
    ? "나의 트리를 둘러보세요!"
    : "나만의 장식을 남겨보세요!";

  return (
    <header className="flex flex-col gap-2 px-5 select-none">
      <div className="flex items-center justify-between">
        <div>
          <p className={`font-memoment text-body md:text-xl ${textColor}`}>
            {welcomeStr}
          </p>
          <h1 className={`text-title font-memoment ${textColor}`}>
            {owner.nickname}님의 <span className="text-green">트리토리</span>
          </h1>
        </div>
        {isOwner && <AddTreeButton onClick={openSizeSheet} />}
      </div>

      <div
        className={`${theme === "SILENT_NIGHT" ? "bg-skyblue/20" : "bg-navy/30"} ${textColor} text-caption flex w-full items-center justify-between rounded-md px-6 py-1.5`}
      >
        {isPlacement ? (
          <>
            <p>
              우측 하단
              <span className="font-bold"> 장식 완료</span> 버튼을 눌러주세요!
            </p>
            <div className="flex items-center gap-3 md:gap-4">
              <button
                className="bg-muted-navy text-beige cursor-pointer rounded-full p-2"
                onClick={refreshOwner}
              >
                <RotateCw size={20} strokeWidth={3} />
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="flex items-center gap-2">
              현재 등록된 장식
              <span className="font-bold">{owner.ornamentsRes?.length}개</span>
            </p>
            <div className="flex items-center gap-3 md:gap-4">
              <button
                className="bg-beige text-muted-navy cursor-pointer rounded-2xl p-2"
                onClick={() => router.push(`/tree/${uuid}/my-ornaments`)}
              >
                <List size={20} strokeWidth={3} />
              </button>
              <button
                className="bg-muted-navy text-beige cursor-pointer rounded-full p-2"
                onClick={refreshOwner}
              >
                <RotateCw size={20} strokeWidth={3} />
              </button>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
