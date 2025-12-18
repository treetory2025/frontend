"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import PreviewModal from "@/components/ui/decorate/nickname/PreviewModal";

export default function NicknameRegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const imgUrl = searchParams.get("imgUrl");
  const ornamentId = searchParams.get("ornamentId");

  const [nickname, setNickname] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const maxLength = 6;

  const handleComplete = async () => {
    const trimmedNickname = nickname.trim();

    if (!trimmedNickname) {
      alert("닉네임을 입력해주세요.");
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

  return (
    <div>
      {/* 큰 트리 배경 (상단 중앙) */}
      <div className="pointer-events-none absolute inset-0 z-0 mb-50 flex items-center justify-center">
        <Image
          src="/images/theme1.png"
          alt="tree"
          width={360}
          height={420}
          priority
          className="object-contain"
        />
      </div>

      {imgUrl && (
        <div className="absolute top-3/8 left-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
          <img
            src={imgUrl}
            alt="ornament preview"
            className="h-24 w-24 rounded-full object-cover"
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

      {/* 오버레이 카드: 트리와 겹치도록 위쪽으로 올려 배치 */}
      <div
        className="absolute left-1/2 z-30 w-full"
        style={{ top: "100%", transform: "translateX(-50%) translateY(-100%)" }}
      >
        <div className="mx-auto w-full bg-[#CCE8F3] p-6 shadow-xl md:p-8">
          <div className="mb-4 text-center">
            <h1 className="text-fg-primary mb-10 text-xl font-bold md:text-2xl">
              닉네임 입력
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <input
              value={nickname}
              onChange={(e) => setNickname(e.target.value.slice(0, maxLength))}
              placeholder="닉네임을 입력해주세요."
              maxLength={maxLength}
              className="flex-1 rounded-lg border border-gray-200 bg-white p-3"
            />
          </div>

          <p className="text-fg-secondary mt-3 mb-10 text-xs">
            글자 수 {nickname.length}/{maxLength}
          </p>

          <button
            onClick={handleComplete}
            disabled={isLoading || nickname.trim().length === 0}
            className="bg-green text-beige mt-6 w-full rounded-lg py-3 font-semibold hover:opacity-90 disabled:opacity-50"
          >
            {isLoading ? "등록 중..." : "다음"}
          </button>
        </div>
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
