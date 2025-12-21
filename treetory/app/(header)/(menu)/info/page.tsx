import ContentSection from "@/components/commons/ContentSection";
import PageHeading from "@/components/commons/PageHeading";
import ContentContainer from "@/components/ui/settings/ContentContainer";
import Image from "next/image";

import rudolph from "@/public/icons/rudolph.png";
import santa from "@/public/icons/santa.png";
import tree from "@/public/icons/tree.png";
import snowman from "@/public/icons/snowman.png";
import cookie from "@/public/icons/cookie.png";
import ornament from "@/public/icons/ornament.png";
import teamIcon from "@/public/icons/team-logo.png";

import Link from "next/link";
import { Link2 } from "lucide-react";

export default function Page() {
  return (
    <>
      <PageHeading title="개발 팀 소개" />
      <ContentSection className="no-scrollbar relative flex h-dvh flex-col space-y-4 overflow-y-auto pb-40 md:space-y-6">
        <ContentContainer>
          <div className="flex items-center justify-between">
            <p className="text-subtitle text-fg-primary mb-2 font-bold">
              developed by
            </p>
            <Link
              href="https://github.com/orgs/treetory2025/repositories"
              className="text-muted-navy text-caption flex items-center gap-2"
            >
              <Link2 />
              team github
            </Link>
          </div>
          <Image src={teamIcon} alt="팀 로고 이미지" />
        </ContentContainer>
        <ContentContainer>
          <p className="text-subtitle text-fg-primary mb-2 font-bold">
            서비스 기획
          </p>
          <div className="flex w-full items-start justify-center gap-4">
            <div className="flex flex-col items-center gap-3">
              <div className="bg-muted-bg flex size-24 items-center justify-center rounded-full">
                <Image
                  src={rudolph}
                  alt="신희진 팀원 소개"
                  className="size-20 rounded-full"
                />
              </div>
              <p className="text-body text-navy font-bold">신희진</p>
              <p className="text-caption text-navy">기획</p>
              <Link
                href="https://github.com/sinijinii"
                className="text-muted-navy text-caption"
              >
                github
              </Link>
            </div>

            <div className="flex flex-col items-center gap-3">
              <div className="bg-navy flex size-24 items-center justify-center rounded-full">
                <Image
                  src={santa}
                  alt="이재성 팀원 소개"
                  className="size-20 rounded-full"
                />
              </div>
              <p className="text-body text-navy font-bold">이재성</p>
              <p className="text-caption text-navy">PM</p>

              <Link
                href="https://github.com/nunori"
                className="text-muted-navy text-caption"
              >
                github
              </Link>
            </div>

            <div className="flex flex-col items-center gap-3">
              <div className="bg-muted-bg flex size-24 items-center justify-center rounded-full">
                <Image src={tree} alt="정진영 팀원 소개" className="w-12" />
              </div>
              <p className="text-body text-navy font-bold">정진영</p>
              <p className="text-caption text-navy">팀장</p>
              <p className="text-caption text-navy">UX/UI</p>
              <Link
                href="https://github.com/jung-jinyoung"
                className="text-muted-navy text-caption"
              >
                github
              </Link>
            </div>
          </div>
        </ContentContainer>
        <ContentContainer>
          <p className="text-subtitle text-fg-primary mb-2 font-bold">
            백엔드 개발
          </p>
          <div className="flex items-start justify-center gap-8">
            <div className="flex flex-col items-center gap-3">
              <div className="bg-navy flex size-24 items-center justify-center rounded-full">
                <Image src={snowman} alt="류인환 팀원 소개" className="w-20" />
              </div>
              <p className="text-body text-navy font-bold">류인환</p>
              <p className="text-caption text-navy">백엔드</p>

              <Link
                href="https://github.com/Cutaku"
                className="text-muted-navy text-caption"
              >
                github
              </Link>
            </div>

            <div className="flex flex-col items-center gap-3">
              <div className="bg-muted-bg flex size-24 items-center justify-center rounded-full">
                <Image src={cookie} alt="오주원 팀원 소개" className="w-16" />
              </div>
              <p className="text-body text-navy font-bold">오주원</p>
              <p className="text-caption text-navy">백엔드/인프라</p>
              <Link
                href="https://github.com/dwd9999"
                className="text-muted-navy text-caption"
              >
                github
              </Link>
            </div>
          </div>
        </ContentContainer>
        <ContentContainer>
          <p className="text-subtitle text-fg-primary mb-2 font-bold">
            프론트엔드 개발
          </p>
          <div className="flex items-start justify-center gap-8">
            <div className="flex flex-col items-center gap-3">
              <div className="bg-muted-bg flex size-24 items-center justify-center rounded-full">
                <Image src={ornament} alt="이상무 팀원 소개" className="w-16" />
              </div>
              <p className="text-body text-navy font-bold">이상무</p>
              <p className="text-caption text-navy">프론트엔드</p>
              <Link
                href="https://github.com/sangmu0502"
                className="text-muted-navy text-caption"
              >
                github
              </Link>
            </div>

            <div className="flex flex-col items-center gap-3">
              <div className="bg-navy flex size-24 items-center justify-center rounded-full">
                <Image src={tree} alt="정진영 팀원 소개" className="w-12" />
              </div>
              <p className="text-body text-navy font-bold">정진영</p>
              <p className="text-caption text-navy">프론트엔드</p>

              <Link
                href="https://github.com/jung-jinyoung"
                className="text-muted-navy text-caption"
              >
                github
              </Link>
            </div>
          </div>
        </ContentContainer>
      </ContentSection>
    </>
  );
}
