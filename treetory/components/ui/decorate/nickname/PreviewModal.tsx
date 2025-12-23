"use client";

import React from "react";
import { motion } from "framer-motion";

interface Props {
  open: boolean;
  onClose: () => void;
  imgUrl?: string | null;
  slideIndex: number;
  setSlideIndex: (i: number) => void;
  onConfirm: () => void;
}

export default function PreviewModal({
  open,
  onClose,
  imgUrl,
  slideIndex,
  setSlideIndex,
  onConfirm,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-t-2xl bg-white">
        <div className="mb-4 text-center">
          <div className="text-green mt-8 mb-2 text-base font-bold">
            미리보기
          </div>
        </div>

        <div className="flex w-full items-center justify-center">
          <div className="flex w-full flex-col items-center justify-center">
            {slideIndex === 0 ? (
              <div className="flex w-full flex-col items-center">
                <div
                  className="border-green relative h-64 w-full border-t-4 border-b-4 bg-[#0f3b5a]"
                  style={{
                    backgroundImage: `url('/images/tree_login2.png')`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundSize: "contain",
                  }}
                >
                  {imgUrl ? (
                    <motion.img
                      src={imgUrl}
                      alt="preview"
                      className="absolute top-1/2 left-1/2 h-11 w-11 -translate-x-1/2 -translate-y-1/2 rounded-full object-cover"
                      style={{ transformOrigin: "50% 50%" }}
                      animate={{ scale: [1, 1.36, 1.73, 1] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  ) : (
                    <motion.div
                      className="bg-beige absolute top-1/2 left-1/2 h-11 w-11 -translate-x-1/2 -translate-y-1/2 rounded-full"
                      style={{ transformOrigin: "50% 50%" }}
                      animate={{ scale: [1, 1.36, 1.73, 1] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  )}
                </div>
                <p className="mt-6 mb-2 text-xl font-bold">
                  편지의 길이만큼 장식도 커져요!
                </p>
                <p className="font-light">
                  그동안 전하지 못한 감사의 마음을 오래 남겨
                </p>
                <p className="font-light">
                  당신의 장식을 더욱 특별하게 빛내보세요.
                </p>
              </div>
            ) : (
              <div className="flex w-full flex-col items-center">
                {/* snowman quick-check button in bottom-right */}
                <div className="pointer-events-auto absolute right-6 bottom-80 z-60 flex flex-col items-center">
                  <div className="relative">
                    <div className="bg-skyblue flex h-20 w-20 items-center justify-center rounded-full border-6 border-white shadow-md">
                      <img
                        src="/icons/snowman.png"
                        alt="snowman"
                        className="mt-10 h-12 w-12"
                        crossOrigin="anonymous"
                      />
                    </div>
                    <div className="font-base absolute -top-3 right-0 rounded bg-red-400 px-2 py-1 text-xs text-white">
                      장식 확인!
                    </div>
                  </div>
                </div>
                <div
                  className="border-green relative h-64 w-full border-t-4 border-b-4 bg-[#0f3b5a] opacity-50"
                  style={{
                    backgroundImage: `url('/images/tree_login2.png')`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundSize: "contain",
                  }}
                >
                  {imgUrl ? (
                    <img
                      src={imgUrl}
                      alt="preview"
                      className="absolute top-1/2 left-1/2 h-15 w-15 -translate-x-1/2 -translate-y-1/2 rounded-full object-cover"
                      crossOrigin="anonymous"
                    />
                  ) : (
                    <img
                      className="bg-beige absolute top-1/2 left-1/2 h-15 w-15 -translate-x-1/2 -translate-y-1/2 rounded-full"
                      style={{ transformOrigin: "50% 50%" }}
                      crossOrigin="anonymous"
                    />
                  )}
                </div>
                <p className="mt-6 mb-2 text-xl font-bold">
                  귀여운 눈사람과 함께 !
                </p>
                <p className="font-light">눈사람을 누르면</p>
                <p className="font-light">
                  장식을 실시간으로 확인할 수 있어요!
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-12 mb-16 flex items-center justify-center gap-2">
          <button
            onClick={() => setSlideIndex(0)}
            className={`h-2 w-2 rounded-full ${slideIndex === 0 ? "bg-muted-navy" : "bg-gray-300"}`}
          />
          <button
            onClick={() => setSlideIndex(1)}
            className={`h-2 w-2 rounded-full ${slideIndex === 1 ? "bg-muted-navy" : "bg-gray-300"}`}
          />
        </div>

        <div className="mt-6 mb-6 flex justify-center">
          {slideIndex === 0 ? (
            <button
              onClick={() => setSlideIndex(1)}
              className="bg-green text-beige min-w-4/5 rounded-lg px-8 py-3 font-semibold"
            >
              다음
            </button>
          ) : (
            <button
              onClick={onConfirm}
              className="bg-green text-beige min-w-4/5 rounded-lg px-8 py-3 font-semibold"
            >
              확인
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
