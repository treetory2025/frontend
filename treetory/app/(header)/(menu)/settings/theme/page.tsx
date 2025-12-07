"use client";

import ContentSection from "@/components/commons/ContentSection";
import PageHeading from "@/components/commons/PageHeading";
import ContentContainer from "@/components/ui/settings/ContentContainer";
import Tab from "@/components/commons/Tab";
import { useState } from "react";
import BackgroundContainer from "@/components/ui/settings/Theme/BackgroundContainer";

export default function Page() {
  const THEME_TABS = [
    { label: "배경", value: "background" },
    { label: "트리", value: "theme" },
  ];
  const [theme, setTheme] = useState(THEME_TABS[0].value);

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
              <p className="text-navy text-subtitle">테마 이름</p>
            </div>
            <BackgroundContainer />
          </>
        )}
      </ContentSection>
    </>
  );
}
