"use client";

import Header from "@/components/ui/decorate/nickname/Header";
import NicknameRegisterPage from "./NicknameRegisterPage";

export default function Page() {
  return (
    <div className="bg-light-blue flex flex-col">
      <Header title="장식하기" />
      <NicknameRegisterPage />
    </div>
  );
}
