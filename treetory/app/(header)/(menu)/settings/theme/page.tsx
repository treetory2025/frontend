"use client";

import { useState, useEffect } from "react";
import { useUserStore } from "@/store/userStore";

import ContentSection from "@/components/commons/ContentSection";
import PageHeading from "@/components/commons/PageHeading";
import Tab from "@/components/commons/Tab";
import BackgroundContainer from "@/components/ui/settings/Theme/BackgroundContainer";
import TreeContainer from "@/components/ui/settings/Theme/TreeContaier";

export default function Page() {
  const THEME_TABS = [
    { label: "배경", value: "background" },
    { label: "트리", value: "tree" },
  ];
  const [theme, setTheme] = useState(THEME_TABS[0].value);
  const user = useUserStore((s) => s.user);
  const hasHydrated = useUserStore((s) => s._hasHydrated);

  const [background, setBackground] = useState("고요한 밤");
  const [tree, setTree] = useState("눈 덮인 트리");

  useEffect(() => {
    if (hasHydrated && user) {
      setBackground(user?.background || "고요한 밤");
      setTree(user?.theme || "눈 덮인 트리");
    }
  }, [hasHydrated, user]);

  //  api 연결 전 임시 로직
  const handleBackGroundUpdate = (newTheme: string) => {
    setBackground(newTheme);
  };
  const handleTreeUpdate = (newTheme: string) => {
    setTree(newTheme);
  };

  return (
    <>
      <PageHeading title="테마 설정" />
      <ContentSection className="flex h-full flex-col gap-3 md:h-dvh">
        <Tab options={THEME_TABS} value={theme} onChange={setTheme} />

        {theme === "background" && (
          <>
            <div className="flex flex-col rounded-xl bg-white p-4">
              <p className="text-caption md:text-body text-muted-navy">
                현재 적용된 테마
              </p>
              <p className="text-navy text-subtitle">{background}</p>
            </div>
            <BackgroundContainer onSubmit={handleBackGroundUpdate} />
          </>
        )}

        {theme === "tree" && (
          <>
            <div className="flex flex-col rounded-xl bg-white p-4">
              <p className="text-caption md:text-body text-muted-navy">
                현재 적용된 테마
              </p>
              <p className="text-navy text-subtitle">{tree}</p>
            </div>
            <TreeContainer onSubmit={handleTreeUpdate} />
          </>
        )}
      </ContentSection>
    </>
  );
}
