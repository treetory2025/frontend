"use client";

import React from 'react';
import { X } from 'lucide-react';
import { OrnamentDetail as ApiOrnamentDetail } from '@/lib/api';

interface Props {
  detail: ApiOrnamentDetail | null;
  onClose: () => void;
}

const CATEGORIES = [
  { id: 'CHRISTMAS', label: '크리스마스', icon: '🎄' },
  { id: 'FOOD', label: '음식', icon: '🍪' },
  { id: 'ANIMAL', label: '동물', icon: '🦌' },
  { id: 'ETC', label: '기타', icon: '✨' },
];

export default function OrnamentPreviewModal({ detail, onClose }: Props) {
  if (!detail) return null;

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="relative z-10 w-[320px] rounded-xl bg-skyblue p-6 shadow-2xl border-4 border-white">
        <button className="absolute right-3 top-3 p-2" onClick={onClose} aria-label="닫기">
          <X />
        </button>

        <h3 className="text-center font-semibold text-lg mb-4">장식 정보</h3>

        <div className="flex flex-col items-center gap-4">
          <button type="button" onClick={() => {}} className="w-28 h-28 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
            <img src={detail.imgUrl} alt={detail.name} className="w-full h-full object-cover" />
          </button>

          <div className="w-full">
            <div className="text-xs text-fg-secondary mb-1">장식 이름</div>
            <div className="w-full rounded-md px-3 py-2 bg-white text-fg-primary">{detail.name}</div>
          </div>

          <div className="w-full mt-2">
            <div className="text-xs text-fg-secondary mb-2">장식 분류</div>
            <div className="flex items-center gap-5">
              {CATEGORIES.map((c) => {
                const selected = detail.category === c.id;
                return (
                  <div key={c.id} className={`flex flex-col items-center gap-1`}> 
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center border ${selected ? 'border-4 border-green bg-navy text-green' : 'border-transparent bg-beige text-fg-primary'}`}>
                      <span className="text-lg">{c.icon}</span>
                    </div>
                    <div className={`text-xs ${selected ? 'text-green' : 'text-fg-secondary'}`}>{c.label}</div>
                  </div>
                );
              })}
            </div>
          </div>

          <button className="mt-6 w-full rounded-md bg-muted-navy px-4 py-3 text-beige font-semibold" onClick={onClose}>닫기</button>
        </div>
      </div>
    </div>
  );
}
