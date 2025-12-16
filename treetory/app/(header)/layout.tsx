"use client";

import Header from "@/components/commons/Header";
import MemberSearchBottomSheet from "@/components/ui/memberSearch/MemberSearchBottomSheet";

export default function HeaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`relative flex h-full w-full flex-col justify-start gap-8`}>
      <header>
        <Header />
      </header>

      {children}
      <MemberSearchBottomSheet />
    </div>
  );
}
