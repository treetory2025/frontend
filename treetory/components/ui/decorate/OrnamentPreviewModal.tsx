"use client";

import React from "react";
import { X } from "lucide-react";
import { OrnamentDetail as ApiOrnamentDetail } from "@/lib/api";

interface Props {
  detail: ApiOrnamentDetail | null;
  onClose: () => void;
}

const CATEGORIES = [
  { id: "CHRISTMAS", label: "크리스마스", icon: "🎄" },
  { id: "FOOD", label: "음식", icon: "🍪" },
  { id: "ANIMAL", label: "동물", icon: "🦌" },
  { id: "ETC", label: "기타", icon: "✨" },
];

export default function OrnamentPreviewModal({ detail, onClose }: Props) {
  if (!detail) return null;

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="bg-skyblue relative z-10 w-[320px] rounded-xl border-4 border-white p-6 shadow-2xl">
        <button
          className="absolute top-3 right-3 p-2"
          onClick={onClose}
          aria-label="닫기"
        >
          <X />
        </button>

        <h3 className="mb-4 text-center text-lg font-semibold">장식 정보</h3>

        <div className="flex flex-col items-center gap-4">
          <button
            type="button"
            onClick={() => {}}
            className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-gray-100"
          >
            <img
              src={detail.imgUrl}
              alt={detail.name}
              className="h-full w-full object-cover"
              crossOrigin="anonymous"
            />
          </button>

          <div className="w-full">
            <div className="text-fg-secondary mb-1 text-xs">장식 이름</div>
            <div className="text-fg-primary w-full rounded-md bg-white px-3 py-2">
              {detail.name}
            </div>
          </div>

          <div className="mt-2 w-full">
            <div className="text-fg-secondary mb-2 text-xs">장식 분류</div>
            <div className="flex items-center gap-5">
              {CATEGORIES.map((c) => {
                const selected = detail.category === c.id;
                return (
                  <div
                    key={c.id}
                    className={`flex flex-col items-center gap-1`}
                  >
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-full border ${selected ? "border-green bg-navy text-green border-4" : "bg-beige text-fg-primary border-transparent"}`}
                    >
                      <span className="text-lg">{c.icon}</span>
                    </div>
                    <div
                      className={`text-xs ${selected ? "text-green" : "text-fg-secondary"}`}
                    >
                      {c.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            className="bg-muted-navy text-beige mt-6 w-full rounded-md px-4 py-3 font-semibold"
            onClick={onClose}
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
