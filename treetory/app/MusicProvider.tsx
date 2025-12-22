"use client";

import GlobalBGM from "@/components/commons/GlobalBGM";

export default function MusicProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <GlobalBGM />
      {children}
    </>
  );
}
