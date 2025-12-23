"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import PreviewModal from "@/components/ui/decorate/nickname/PreviewModal";
import { useAlert } from "@/hooks/useAlert";

export default function NicknameRegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const imgUrl = searchParams.get("imgUrl");
  const ornamentId = searchParams.get("ornamentId");

  const alert = useAlert();

  const [nickname, setNickname] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const maxLength = 6;

  const handleComplete = async () => {
    const trimmedNickname = nickname.trim();

    if (!trimmedNickname) {
      alert("닉네임을 입력해주세요.");
      return;
    }

    if (/\s/.test(trimmedNickname)) {
      alert(
        "입력할 수 없는 문자가 포함되어 있습니다.\n공백은 사용할 수 없습니다.",
      );
      return;
    }
    if (trimmedNickname.length > maxLength) {
      alert(`닉네임은 ${maxLength}자 이하로 입력해주세요.`);
      return;
    }

    setIsLoading(true);
    try {
      // TODO: 닉네임 저장 API 호출
      // await saveNickname(trimmedNickname);

      // reset slide and show preview modal
      setSlideIndex(0);
      setShowPreview(true);
    } catch (err) {
      console.error(err);
      alert("닉네임 등록 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const [showPreview, setShowPreview] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);

  const goToLetter = () => {
    const base =
      (typeof window !== "undefined" &&
        window.location.pathname.split("/decorate")[0]) ||
      "";
    const params = new URLSearchParams();
    if (imgUrl) params.set("imgUrl", imgUrl);
    if (nickname.trim()) params.set("nickname", nickname.trim());
    if (ornamentId) params.set("ornamentId", ornamentId);
    router.push(`${base}/letter?${params.toString()}`);
  };

  // 닉네임 공백 확인
  const hasWhitespace = /\s/.test(nickname);

  return (
    <div className="flex flex-col items-center gap-0">
      {/* 큰 트리 배경 (상단 중앙) */}
      <div className="bg-navy pointer-events-none relative flex size-70 w-full shrink-0 items-center justify-center overflow-hidden">
        <div className="relative size-110">
          <Image
            src="/images/theme1.png"
            alt="tree"
            fill
            priority
            className="translate-y-10 object-contain"
          />
        </div>

        {imgUrl && (
          <div className="absolute top-3/5 left-1/2 z-1 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
            <img
              src={imgUrl}
              alt="ornament preview"
              className="size-22 rounded-full object-cover"
              crossOrigin="anonymous"
            />
            {/* 실시간 닉네임 미리보기 (이미지 바로 아래) */}
            {nickname.trim() && (
              <div className="mt-2">
                <div
                  className="inline-block px-3 py-1 shadow-sm"
                  style={{
                    backgroundColor: "rgba(230,243,249,0.2)",
                    borderRadius: 8,
                  }}
                >
                  <span className="text-sm font-normal text-white">
                    {nickname.trim() || "\u00A0"}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 오버레이 카드: 트리와 겹치도록 위쪽으로 올려 배치 */}
      <div className="bg-skyblue border-beige flex w-full flex-col items-center gap-8 border-t-8 px-4 py-8 pb-40">
        <h1 className="text-fg-primary text-xl font-bold md:text-2xl">
          닉네임 입력
        </h1>

        <div className="flex w-full flex-col gap-3">
          <input
            value={nickname}
            onChange={(e) => setNickname(e.target.value.slice(0, maxLength))}
            placeholder="닉네임을 입력해주세요."
            maxLength={maxLength}
            className="w-full rounded-lg border border-gray-200 bg-white p-3"
          />
          <p className="text-fg-secondary text-caption">
            글자수 {nickname.length}/{maxLength}
          </p>
          {hasWhitespace && (
            <p className="text-caption text-red">
              공백은 닉네임에 포함할 수 없습니다.
            </p>
          )}
        </div>

        <button
          onClick={handleComplete}
          disabled={isLoading || nickname.trim().length === 0 || hasWhitespace}
          className="bg-green text-body text-beige w-full cursor-pointer rounded-lg py-3 font-semibold hover:opacity-90 disabled:opacity-50"
        >
          {isLoading ? "등록 중..." : "다음"}
        </button>
      </div>
      {/* 미리보기 모달 */}
      <PreviewModal
        open={showPreview}
        onClose={() => setShowPreview(false)}
        imgUrl={imgUrl}
        slideIndex={slideIndex}
        setSlideIndex={setSlideIndex}
        onConfirm={goToLetter}
      />
    </div>
  );
}
