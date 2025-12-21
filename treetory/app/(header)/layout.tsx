"use client";

import Header from "@/components/commons/Header";
import MemberSearchBottomSheet from "@/components/ui/memberSearch/MemberSearchBottomSheet";
import OrnamentInfoModal from "@/components/ui/tree/OrnamentInfoModal";

export default function HeaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`relative flex w-full flex-col justify-start gap-8`}>
      <header>
        <Header />
      </header>

      {children}
      <MemberSearchBottomSheet />
      <OrnamentInfoModal />
    </div>
  );
}
