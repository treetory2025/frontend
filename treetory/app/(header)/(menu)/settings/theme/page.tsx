"use client";

import { useState, useEffect } from "react";
import { useUserStore } from "@/store/userStore";

import ContentSection from "@/components/commons/ContentSection";
import PageHeading from "@/components/commons/PageHeading";
import Tab from "@/components/commons/Tab";
import BackgroundContainer from "@/components/ui/settings/Theme/BackgroundContainer";
import TreeContainer from "@/components/ui/settings/Theme/TreeContaier";
import { apiFetch } from "@/lib/api";

export default function Page() {
  const THEME_TABS = [
    { label: "배경", value: "background" },
    { label: "트리", value: "tree" },
  ];
  const [theme, setTheme] = useState(THEME_TABS[0].value);
  const user = useUserStore((s) => s.user);
  const setUser = useUserStore.getState().setUser;
  const hasHydrated = useUserStore((s) => s._hasHydrated);

  const [background, setBackground] = useState("고요한 밤");
  const [tree, setTree] = useState("눈 덮인 트리");

  useEffect(() => {
    if (hasHydrated && user) {
      setBackground(user?.background || "고요한 밤");
      setTree(user?.theme || "눈 덮인 트리");
    }
  }, [hasHydrated, user]);

  // 테마 배경 변경
  const handleBackGroundUpdate = () => {
    async function patchBackground() {
      try {
        const res = await apiFetch(`/api/trees/backgrounds`, {
          method: "PATCH",
          credentials: "include",
        });

        if (!res.ok) {
          console.log("api 응답 실패", res);
          return;
        }

        const data = await res.json();
        console.log("배경 테마 변경 성공", data);
        const newBackground = data?.body;

        // 테마 변경 후 최신 사용자 정보 재조회
        try {
          const meRes = await apiFetch(`/api/members/me`, {
            credentials: "include",
          });
          if (meRes.ok) {
            const meData = await meRes.json();
            const me = meData?.body ?? meData;
            setUser(me);
            setBackground(newBackground);
          }
        } catch (error) {
          console.error("트리 테마 변경 후 정보 조회 실패", error);
        }
      } catch (error) {
        console.error(error);
      }
    }

    patchBackground();
  };

  const handleTreeUpdate = () => {
    async function patchTheme() {
      try {
        const res = await apiFetch(`/api/trees/themes`, {
          method: "PATCH",
          credentials: "include",
        });
        if (!res.ok) {
          console.log("api 응답 실패", res);
        }

        const data = await res.json();
        console.log("트리 테마 변경 성공", data);
        const newTheme = data?.body;

        // 테마 변경 후 최신 사용자 정보 재조회
        try {
          const meRes = await apiFetch(`/api/members/me`, {
            credentials: "include",
          });
          if (meRes.ok) {
            const meData = await meRes.json();
            const me = meData?.body ?? meData;
            setUser(me);
            setTheme(newTheme);
          }
        } catch (error) {
          console.error("트리 테마 변경 후 정보 조회 실패", error);
        }
      } catch (error) {
        console.error(error);
      }
    }
    patchTheme();
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
              <p className="text-navy text-subtitle">
                {background === "SILENT_NIGHT" ? "고요한 밤" : "눈 내리는 언덕"}
              </p>
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
              <p className="text-navy text-subtitle">
                {tree === "SNOWY" ? "눈덮인 트리" : "기본 트리"}
              </p>
            </div>
            <TreeContainer onSubmit={handleTreeUpdate} />
          </>
        )}
      </ContentSection>
    </>
  );
}
