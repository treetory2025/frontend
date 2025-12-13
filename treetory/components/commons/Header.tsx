"use client";

import menuIcon from "@/public/icons/menu(default).svg";
import cameraIcon from "@/public/icons/camera.svg";
import rudolphIcon from "@/public/icons/rudolph.png";
import santaIcon from "@/public/icons/santa.png";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import HeaderMenu from "@/components/ui/menu/HeaderMenu";
import useCloseOnOutsideOrEsc from "@/hooks/useCloseOnOutsideOrEsc";
import {
  getDaysUntilChristmas2025InKorea,
  isChristmas2025InKorea,
} from "@/lib/date";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [diffdays, setDiffdays] = useState(0);
  const menuRef = useRef<HTMLDivElement | null>(null);
  // const isChristmas = isChristmas2025InKorea();
  const isChristmas = true;
  useEffect(() => {
    if (isChristmas) return;
    const diff = getDaysUntilChristmas2025InKorea();
    setDiffdays(diff);
  }, [isChristmas]);

  useCloseOnOutsideOrEsc(menuRef, {
    isOpen: isMenuOpen,
    onClose: () => setIsMenuOpen(false),
  });

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
            <div className="border-red absolute top-12 left-0 z-100 box-content flex w-[180px] justify-start rounded-xl border-4 bg-white p-2">
              <HeaderMenu onClose={() => setIsMenuOpen(false)} />
            </div>
          )}
        </div>
        {/* 캡쳐 버튼 */}
        <button className="bg-yellow flex h-10 w-10 cursor-pointer items-center justify-center rounded-full">
          <Image src={cameraIcon} alt="camera" />
        </button>
      </div>
      {/* 크리스마스 디데이 안내 */}
      {isChristmas ? (
        <ChristmasBanner isChristmas={isChristmas} />
      ) : (
        <div className="bg-beige flex h-10 items-center justify-center gap-2 rounded-full px-4">
          <Image src={rudolphIcon} alt="rudolph" />
          <p className="text-caption text-fg-primary">
            크리스마스까지? <span className="font-bold"> D-{diffdays}</span>
          </p>
        </div>
      )}
    </div>
  );
}

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
      <Image src={santaIcon} alt="santa" />

      {/* 텍스트 */}
      <span className="text-body text-beige">메리 크리스마스!</span>
    </motion.div>
  );
};
