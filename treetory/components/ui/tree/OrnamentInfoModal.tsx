"use client";

import { apiFetch } from "@/lib/api";
import { useOrnamentInfoMdalStore } from "@/store/useModalStore";
import { OrnamentInfo } from "@/types/ornarment";
import Image from "next/image";
import { useEffect, useState } from "react";
import { CategoryBadge } from "./CategoryBadge";

import rudolphIcon from "@/public/icons/rudolph.png"; // animal
import santaIcon from "@/public/icons/santa.png"; //christmas
import cookieIcon from "@/public/icons/cookie.png"; // food
import ornamentIcon from "@/public/icons/ornament.png"; //etc

const CATEGORIES = [
  { id: "CHRISTMAS", label: "크리스마스", icon: santaIcon.src },
  { id: "FOOD", label: "음식", icon: cookieIcon.src },
  { id: "ANIMAL", label: "동물", icon: rudolphIcon.src },
  { id: "ETC", label: "기타", icon: ornamentIcon.src },
];
export default function OrnamentInfoModal() {
  const { isOpen, ornamentId, closeModal } = useOrnamentInfoMdalStore();

  const [ornament, setOrnament] = useState<OrnamentInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!isOpen || !ornamentId) return;

    const fetchOrnament = async () => {
      setLoading(true);

      try {
        const res = await apiFetch(`/api/ornaments/${ornamentId}`);

        if (!res.ok) {
          throw new Error("장식 정보를 불러오지 못했습니다.");
        }

        const data = await res.json();
        setOrnament(data.body);
      } catch (error) {
        console.error("정보 불러오기 실패", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrnament();
  }, [isOpen, ornamentId]);

  const handleClose = () => {
    setOrnament(null);
    closeModal();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-500 flex items-center justify-center bg-black/40">
      <div className="bg-skyblue-background flex w-[30dvw] min-w-[320px] flex-col items-center justify-center gap-6 rounded-lg p-8 md:p-16">
        <p className="text-subtitle text-navy font-bold md:text-2xl">
          장식 상세 정보
        </p>

        {loading && (
          <p className="text-body text-muted-navy">
            정보를 불러오는 중입니다...
          </p>
        )}

        {ornament && (
          <>
            <div className="bg-muted-bg flex size-30 items-center justify-center rounded-full md:size-40">
              <div className="relative size-20 rounded-full md:size-30">
                <Image
                  src={ornament.imgUrl}
                  alt={"장식 미리보기"}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
            </div>
            <div className="text-caption md:text-body text-navy w-full space-y-2">
              <p>장식 이름</p>
              <div className="bg-muted-bg w-full rounded-lg p-4 font-bold">
                {ornament.name}
              </div>
            </div>
            <div className="text-caption md:text-body text-navy w-full space-y-2">
              <p>장식 분류</p>
              <div className="grid max-w-full grid-cols-[repeat(auto-fit,minmax(100px,1fr))]">
                {CATEGORIES.map((category) => (
                  <CategoryBadge
                    key={category.id}
                    label={category.label}
                    icon={category.icon}
                    active={ornament.category === category.id}
                  />
                ))}
              </div>
            </div>
          </>
        )}

        <button
          onClick={handleClose}
          className="bg-muted-navy text-beige text-button w-full cursor-pointer rounded-lg py-3"
        >
          닫기
        </button>
      </div>
    </div>
  );
}
