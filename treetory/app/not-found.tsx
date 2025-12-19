"use client";

import { Frown } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NotFoundPage() {
  const router = useRouter();
  return (
    <div className="my-auto flex h-full w-full flex-col items-center justify-center gap-4">
      <div className="px-4 text-center">
        <div className="text-fg-primary flex w-full justify-center">
          <Frown size={40} />
        </div>
        <h1 className="text-title text-fg-primary">404</h1>
        <p className="text-subtitle text-fg-primary font-medium">
          요청하신 페이지를 찾을 수 없습니다.
        </p>
      </div>
      <div className="flex flex-col items-center justify-center">
        <button
          onClick={() => router.push("/")}
          className="text-beige text-subtitle bg-green w-full cursor-pointer rounded-xl p-2 text-center font-bold"
        >
          홈으로 이동하기
        </button>
        <p className="text-green/50 text-body mt-2">
          로그인이 필요한 경우 로그인 페이지로 이동합니다.
        </p>
      </div>
    </div>
  );
}
