"use client";

import PageHeading from "@/components/commons/PageHeading";
import CreateOrnamentPage from "./CreateOrnamentPage";
import { useUserStore } from "@/store/userStore";
import { useAlert } from "@/hooks/useAlert";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const user = useUserStore((s) => s.user);

  const alert = useAlert();

  if (!user) {
    alert("로그인이 필요합니다.", () => router.back());
    return (
      <>
        <PageHeading title="장식하기" />
        <div className="text-navy text-subtitle flex h-dvh items-center justify-center text-center">
          <p className="text-body">사용자 정보 확인 중</p>
        </div>
      </>
    );
  }

  return (
    <div className="bg-light-blue flex flex-col">
      <PageHeading title="장식하기" />
      <CreateOrnamentPage />
    </div>
  );
}
