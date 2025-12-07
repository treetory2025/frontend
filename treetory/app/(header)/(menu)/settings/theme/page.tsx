"use client";

import { useState } from "react";
import { useUserStore } from "@/store/useStore";

import ContentSection from "@/components/commons/ContentSection";
import PageHeading from "@/components/commons/PageHeading";
import Tab from "@/components/commons/Tab";
import BackgroundContainer from "@/components/ui/settings/Theme/BackgroundContainer";

export default function Page() {
  const THEME_TABS = [
    { label: "배경", value: "background" },
    { label: "트리", value: "theme" },
  ];
  const [theme, setTheme] = useState(THEME_TABS[0].value);
  const user = useUserStore((s) => s.user);

  const [background, setBackground] = useState(user?.background || "고요한 밤");
  //  api 연결 전 임시 로직
  const handleBackGroundUpdate = (newTheme: string) => {
    setBackground(newTheme);
  };

  return (
    <>
      <PageHeading title="테마 설정" />
      <ContentSection className="flex h-full flex-col gap-3">
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
      </ContentSection>
    </>
  );
}
