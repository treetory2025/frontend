import PageHeading from "@/components/commons/PageHeading";
import ContentSection from "@/components/commons/ContentSection";
import ContentContainer from "@/components/ui/settings/ContentContainer";
import { MoveRight, SquarePen, MessageCircleQuestionMark } from "lucide-react";

export default function Page() {
  return (
    <>
      <PageHeading title="설정" />
      <ContentSection className="space-y-4 md:space-y-6">
        <ContentContainer>
          <p className="text-subtitle text-primary pb-3">내 정보</p>
          <div className="flex flex-col gap-3 px-2 py-1">
            <p className="text-caption md:text-body text-muted-navy">닉네임</p>
            {/* 닉네임 정보 */}
            <div className="text-body bg-muted-bg text-navy rounded-lg px-2 py-3 md:text-lg">
              닉네임표시
            </div>
            <div className="flex justify-end">
              <button className="bg-muted-navy text-beige text-button flex cursor-pointer items-center gap-2 rounded-sm px-4 py-2">
                변경하기
                <SquarePen size={16} className="inline-block" />
              </button>
            </div>
            {/* 가입 계정 정보 */}
            <p className="text-caption md:text-body text-muted-navy">
              가입 계정
            </p>
            <p className="text-navy text-body md:text-lg">id@email.com</p>
          </div>
        </ContentContainer>

        <ContentContainer>
          <div className="flex w-full items-center justify-between pb-3">
            <h3 className="text-subtitle text-primary">테마 정보</h3>
            <button className="cursor-pointer">
              <MoveRight size={24} className="text-muted-navy" />
            </button>
          </div>
          <div className="flex flex-col gap-3 px-2 py-1">
            <div className="py-1">
              <p className="text-caption md:text-body text-muted-navy">
                현재 적용된 배경
              </p>
              <p className="text-navy text-body text-primary md:text-lg">
                고요한밤
              </p>
            </div>
            <div className="py-1">
              <p className="text-caption md:text-body text-muted-navy">
                현재 적용된 트리
              </p>
              <p className="text-navy text-body text-primary md:text-lg">
                눈 덮인 트리
              </p>
            </div>
          </div>
        </ContentContainer>

        {/* 개발 정보 */}
        <ContentContainer>
          <p className="text-subtitle text-primary pb-3">트리토리 서비스</p>
          <div className="flex items-center justify-between p-2">
            <p className="text-navy text-body md:text-lg">팀원 소개</p>
            <button className="cursor-pointer">
              <MoveRight size={24} className="text-muted-navy" />
            </button>
          </div>
          <button className="cursor-pointer p-2">
            <div className="itemsx-center flex w-full gap-4">
              <p className="text-navy text-body md:text-lg">의견 보내기</p>
              <MessageCircleQuestionMark size={20} />
            </div>
          </button>
          <div className="border-muted-navy m-2 border-t-2 p-2" />
          <button className="text-subtitle text-red w-full cursor-pointer p-2 text-start font-bold">
            회원탈퇴
          </button>
        </ContentContainer>
      </ContentSection>
    </>
  );
}
