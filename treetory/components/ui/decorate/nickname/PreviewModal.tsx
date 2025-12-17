"use client";

import React from "react";
import { motion } from 'framer-motion';

interface Props {
  open: boolean;
  onClose: () => void;
  imgUrl?: string | null;
  slideIndex: number;
  setSlideIndex: (i: number) => void;
  onConfirm: () => void;
}

export default function PreviewModal({ open, onClose, imgUrl, slideIndex, setSlideIndex, onConfirm }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white rounded-t-2xl">
        <div className="text-center mb-4">
          <div className="text-base font-bold text-green mt-8 mb-2">미리보기</div>
        </div>

        <div className="w-full flex items-center justify-center">
          <div className="w-full flex flex-col items-center justify-center">
            {slideIndex === 0 ? (
              <div className="flex flex-col items-center w-full">
                <div
                  className="w-full h-64 relative bg-[#0f3b5a] border-t-4 border-b-4 border-green"
                  style={{
                    backgroundImage: `url('/images/tree_login2.png')`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'contain',
                  }}
                >
                  {imgUrl ? (
                    <motion.img
                      src={imgUrl}
                      alt="preview"
                      className="absolute left-1/2 top-1/2 w-11 h-11 rounded-full object-cover -translate-x-1/2 -translate-y-1/2"
                      style={{ transformOrigin: '50% 50%' }}
                      animate={{ scale: [1, 1.36, 1.73, 1] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                    />
                  ) : (
                    <motion.div
                      className="absolute left-1/2 top-1/2 w-11 h-11 rounded-full bg-beige -translate-x-1/2 -translate-y-1/2"
                      style={{ transformOrigin: '50% 50%' }}
                      animate={{ scale: [1, 1.36, 1.73, 1] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                    />
                  )}
                </div>
                <p className="text-xl font-bold mt-6 mb-2">편지의 길이만큼 장식도 커져요!</p>
                <p className='font-light'>그동안 전하지 못한 감사의 마음을 오래 남겨</p>
                <p className='font-light'>당신의 장식을 더욱 특별하게 빛내보세요.</p>
              </div>
            ) : (
              <div className="flex flex-col items-center w-full">
                {/* snowman quick-check button in bottom-right */}
                <div className="absolute bottom-80 right-6 z-60 flex flex-col items-center pointer-events-auto">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-full bg-skyblue flex items-center justify-center border-6 border-white shadow-md">
                        <img src="/icons/snowman.png" alt="snowman" className="w-12 h-12 mt-10" />
                      </div>
                      <div className="absolute -top-3 right-0 bg-red-400 text-white text-xs font-base px-2 py-1 rounded">
                          장식 확인!
                      </div>
                    </div>
                </div>
                <div
                  className="w-full h-64 relative bg-[#0f3b5a] border-t-4 border-b-4 border-green opacity-50"
                  style={{
                    backgroundImage: `url('/images/tree_login2.png')`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'contain',
                  }}
                >
                  {imgUrl ? (
                    <img
                      src={imgUrl}
                      alt="preview"
                      className="absolute left-1/2 top-1/2 w-15 h-15 rounded-full object-cover -translate-x-1/2 -translate-y-1/2"
                    />
                  ) : (
                    <img
                      className="absolute left-1/2 top-1/2 w-15 h-15 rounded-full bg-beige -translate-x-1/2 -translate-y-1/2"
                      style={{ transformOrigin: '50% 50%' }}
                    />
                  )}
                </div>
                <p className="text-xl font-bold mt-6 mb-2">귀여운 눈사람과 함께 !</p>
                <p className='font-light'>눈사람을 누르면</p>
                <p className='font-light'>장식을 실시간으로 확인할 수 있어요!</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 mt-12 mb-16">
          <button onClick={() => setSlideIndex(0)} className={`w-2 h-2 rounded-full ${slideIndex === 0 ? 'bg-muted-navy' : 'bg-gray-300'}`} />
          <button onClick={() => setSlideIndex(1)} className={`w-2 h-2 rounded-full ${slideIndex === 1 ? 'bg-muted-navy' : 'bg-gray-300'}`} />
        </div>

        <div className="flex justify-center mb-6 mt-6">
          {slideIndex === 0 ? (
            <button
              onClick={() => setSlideIndex(1)}
              className="px-8 py-3 min-w-4/5 bg-green text-beige rounded-lg font-semibold"
            >
              다음
            </button>
          ) : (
            <button
              onClick={onConfirm}
              className="px-8 py-3 min-w-4/5 bg-green text-beige rounded-lg font-semibold"
            >
              확인
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
