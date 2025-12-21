"use client";

import PageHeading from "@/components/commons/PageHeading";
import ContentSection from "@/components/commons/ContentSection";
import ContentContainer from "@/components/ui/settings/ContentContainer";
import { MoveRight, SquarePen, MessageCircleQuestionMark } from "lucide-react";

import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";

import { useBottomSheet } from "@/hooks/useBottomSheet";
import NicknameBottomSheet from "@/components/ui/settings/NicknameBottomSheet";
import { useAlert } from "@/hooks/useAlert";

export default function Page() {
  const router = useRouter();
  const user = useUserStore((s) => s.user);
  const hasHydrated = useUserStore((s) => s._hasHydrated);
  // 닉네임 바텀 시트 상태 관리
  const { isOpen, open, close } = useBottomSheet();

  const alert = useAlert();
  if (!user) {
    alert("로그인이 필요합니다.", () => router.back());
    return (
      <>
        <PageHeading title="설정" />
        <ContentSection className="no-scrollbar relative flex h-full flex-col space-y-4 overflow-y-auto md:space-y-6">
          <div className="text-navy text-subtitle flex h-full items-center justify-center text-center">
            사용자 정보 확인 중
          </div>
        </ContentSection>
      </>
    );
  }

  if (!hasHydrated) {
    return (
      <>
        <PageHeading title="설정" />
      </>
    ); // 또는 로딩 UI
  }

  return (
    <>
      <PageHeading title="설정" />
      <ContentSection className="no-scrollbar relative flex h-full flex-col space-y-4 overflow-y-auto md:space-y-6">
        <ContentContainer>
          <p className="text-subtitle text-fg-primary pb-3">내 정보</p>
          <div className="flex flex-col gap-3 px-2 py-1">
            <p className="text-caption md:text-body text-muted-navy">닉네임</p>
            {/* 닉네임 정보 */}
            <div className="text-body bg-muted-bg text-navy rounded-lg px-2 py-4 md:text-lg">
              {user?.nickname}
            </div>
            <div className="flex justify-end">
              <button
                className="bg-muted-navy text-beige text-button flex cursor-pointer items-center gap-2 rounded-sm px-4 py-2"
                onClick={open}
              >
                변경하기
                <SquarePen size={16} className="inline-block" />
              </button>
            </div>
            {/* 가입 계정 정보 */}
            <p className="text-caption md:text-body text-muted-navy">
              가입 계정
            </p>
            <p className="text-navy text-body md:text-lg">{user?.email}</p>
          </div>
        </ContentContainer>

        <ContentContainer>
          <div className="flex w-full items-center justify-between pb-3">
            <h3 className="text-subtitle text-fg-primary">테마 정보</h3>
            <button
              className="cursor-pointer"
              onClick={() => {
                router.push("/settings/theme");
              }}
            >
              <MoveRight size={24} className="text-muted-navy" />
            </button>
          </div>
          <div className="flex flex-col gap-3 px-2 py-1">
            <div className="py-1">
              <p className="text-caption md:text-body text-muted-navy">
                현재 적용된 배경
              </p>
              <p className="text-navy text-body md:text-lg">
                {user?.background === "SILENT_NIGHT"
                  ? "고요한 밤"
                  : "눈 내리는 언덕"}
              </p>
            </div>
            <div className="py-1">
              <p className="text-caption md:text-body text-muted-navy">
                현재 적용된 트리
              </p>
              <p className="text-navy text-body text-primary md:text-lg">
                {user?.theme === "SNOWY" ? "눈덮인 트리" : "기본 트리"}
              </p>
            </div>
          </div>
        </ContentContainer>

        {/* 개발 정보 */}
        <ContentContainer>
          <p className="text-subtitle text-primary pb-3">트리토리 서비스</p>
          <div className="flex items-center justify-between p-2">
            <p className="text-navy text-body md:text-lg">팀원 소개</p>
            <button
              className="cursor-pointer"
              onClick={() => router.push("/info")}
            >
              <MoveRight size={24} className="text-muted-navy" />
            </button>
          </div>
          <button className="cursor-pointer p-2">
            <div className="itemsx-center flex w-full gap-4">
              <p className="text-navy text-body md:text-lg">의견 보내기</p>
              <MessageCircleQuestionMark size={18} className="mt-0.5" />
            </div>
            <p
              className="text-caption text-muted-navy text-left"
              onClick={() =>
                window.open(
                  "https://docs.google.com/forms/d/e/1FAIpQLScy13SV6H_YUz61h_lDa9qtbOWN8w3r8uEQjtlTTb2vkN7I9A/viewform?pli=1",
                  "_blank",
                )
              }
            >
              서비스 의견을 들려주세요! 클릭 시 구글 폼 설문조사로 이동합니다.
            </p>
          </button>
        </ContentContainer>
      </ContentSection>

      {/* 닉네임 변경 바텀 시트 */}
      <NicknameBottomSheet isOpen={isOpen} onClose={close} />
    </>
  );
}
