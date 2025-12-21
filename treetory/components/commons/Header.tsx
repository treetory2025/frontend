"use client";

import menuIcon from "@/public/icons/menu(default).svg";
import rudolphIcon from "@/public/icons/rudolph.png";
import santaIcon from "@/public/icons/santa.png";
import starIcon from "@/public/icons/Star.svg";
import starOffIcon from "@/public/icons/StarOff.svg";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import HeaderMenu from "@/components/ui/menu/HeaderMenu";
import useCloseOnOutsideOrEsc from "@/hooks/useCloseOnOutsideOrEsc";
import {
  getDaysUntilChristmas2025InKorea,
  isChristmas2025InKorea,
} from "@/lib/date";

import { useUserStore } from "@/store/userStore";
import { useParams, usePathname } from "next/navigation";
import { isLoggedIn } from "@/lib/auth";
import { ImageDown } from "lucide-react";
import { useCaptureStore } from "@/store/useCaptureStore";
import { useBookmarkStore } from "@/store/useBookmarkStore";
import { toggleBookmakApi } from "@/lib/bookmark";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [diffdays, setDiffdays] = useState(0);

  const menuRef = useRef<HTMLDivElement | null>(null);
  const isChristmas = isChristmas2025InKorea();

  // 캡쳐 state
  const capture = useCaptureStore((s) => s.capture);

  const loggedIn = isLoggedIn();

  // 유저 정보, 트리 소유자 정보 확인
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const isTreePage = segments.length === 2 && segments[0] === "tree";

  const params = useParams<{ uuid?: string }>();
  const treeUuid = isTreePage ? params?.uuid : null;

  const user = useUserStore((s) => s.user);

  const isTreeOwner =
    isTreePage && Boolean(user?.uuid && treeUuid && user.uuid === treeUuid);

  useEffect(() => {
    if (isChristmas) return;
    const diff = getDaysUntilChristmas2025InKorea();
    setDiffdays(diff);
  }, [isChristmas]);

  useCloseOnOutsideOrEsc(menuRef, {
    isOpen: isMenuOpen,
    onClose: () => setIsMenuOpen(false),
  });

  // 즐겨찾기 여부 확인
  const { isBookmarked, toggleBookmarked } = useBookmarkStore();
  const onClickBookmark = async () => {
    if (!treeUuid) return;

    const current = isBookmarked;

    try {
      toggleBookmarked();
      await toggleBookmakApi({
        targetMemberId: treeUuid,
        isBookmarked: current,
      });
      console.log("북마크 api 성공");
    } catch {
      toggleBookmarked();
    }
  };

  return (
    <div className="flex w-full items-center justify-between px-5 pt-6 md:pt-12">
      <div className="flex items-center justify-between gap-3">
        {/* 메뉴 버튼 */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="bg-red flex h-10 w-10 cursor-pointer items-center justify-center rounded-full"
          >
            <Image src={menuIcon} alt="menu" />
          </button>
          {/* 메뉴 토글 */}
          {isMenuOpen && (
            <div className="border-red absolute top-12 left-0 z-30 box-content flex w-[180px] justify-start rounded-xl border-4 bg-white p-2">
              <HeaderMenu onClose={() => setIsMenuOpen(false)} />
            </div>
          )}
        </div>

        {/* 캡쳐 버튼 */}
        {isTreePage && isTreeOwner && (
          <button
            className="bg-yellow text-beige flex h-10 w-10 cursor-pointer items-center justify-center rounded-full"
            onClick={capture}
          >
            <ImageDown size={24} strokeWidth={2} />
          </button>
        )}

        {/* 즐겨찾기 버튼 */}
        {loggedIn && isTreePage && !isTreeOwner && (
          <div className="group relative">
            <button
              className="text-yellow flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white"
              onClick={onClickBookmark}
            >
              {isBookmarked ? (
                <Image src={starIcon} alt="bookmark True" />
              ) : (
                <Image src={starOffIcon} alt="bookmark False" />
              )}
            </button>

            <div
              className={`pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 translate-y-1 rounded-md ${isBookmarked ? "bg-muted-navy" : "bg-[#FF4800]"} px-2 py-1 text-xs whitespace-nowrap text-white opacity-0 transition-all duration-150 group-hover:translate-y-0 group-hover:opacity-100`}
            >
              {isBookmarked
                ? "클릭하면 즐겨찾기에서 제거됩니다."
                : "클릭해서 즐겨찾기에 추가해보세요!"}
            </div>
          </div>
        )}
      </div>
      {/* 크리스마스 디데이 안내 */}
      {isChristmas ? (
        <ChristmasBanner isChristmas={isChristmas} />
      ) : (
        <div className="bg-beige flex h-10 items-center justify-center gap-2 rounded-full px-4">
          <Image src={rudolphIcon} alt="rudolph" className="size-8" />
          <p className="text-caption text-fg-primary">
            크리스마스까지?
            <span className="text-body font-bold"> D-{diffdays}</span>
          </p>
        </div>
      )}
    </div>
  );
}

// 크리스마스 배너
type Props = {
  isChristmas: boolean;
};

export const ChristmasBanner = ({ isChristmas }: Props) => {
  return (
    <motion.div
      animate={
        isChristmas
          ? {
              boxShadow: [
                "0px 0px 20px 7px rgba(32,159,135,0.25)",
                "0px 0px 30px 12px rgba(32,159,135,0.45)",
                "0px 0px 20px 7px rgba(32,159,135,0.25)",
              ],
            }
          : {}
      }
      transition={
        isChristmas
          ? {
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }
          : undefined
      }
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        width: 195,
        height: 40,
        padding: "0 16px",
        background: "#209F87",
        borderRadius: 100,
      }}
    >
      {/* 아이콘 */}
      <Image src={santaIcon} alt="santa" className="size-8" />

      {/* 텍스트 */}
      <span className="text-body text-beige">메리 크리스마스!</span>
    </motion.div>
  );
};
