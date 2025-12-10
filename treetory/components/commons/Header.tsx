"use client";

import menuIcon from "@/public/icons/menu(default).svg";
import cameraIcon from "@/public/icons/camera.svg";
import rudolphIcon from "@/public/icons/rudolph.png";
import Image from "next/image";
import { useRef, useState } from "react";

import HeaderMenu from "@/components/ui/menu/HeaderMenu";
import useCloseOnOutsideOrEsc from "@/hooks/useCloseOnOutsideOrEsc";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

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
      <div className="bg-beige flex h-10 items-center justify-center gap-2 rounded-full px-4">
        <Image src={rudolphIcon} alt="rudolph" />
        <p className="text-caption text-fg-primary">
          크리스마스까지? <span className="font-bold">D-22</span>
        </p>
      </div>
    </div>
  );
}
