"use client";

import { useState, useEffect, useCallback } from "react";
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

  // 서버 기준
  const [background, setBackground] = useState("고요한 밤");
  const [tree, setTree] = useState("눈 덮인 트리");

  // 사용자 선택 기준
  const [selectedBackground, setSelectedBackground] = useState<string | null>(
    null,
  );
  const [selectedTree, setSelectedTree] = useState<string | null>(null);

  useEffect(() => {
    if (hasHydrated && user) {
      setBackground(user?.background || "고요한 밤");
      setTree(user?.theme || "눈 덮인 트리");
    }
  }, [hasHydrated, user]);

  const refreshMe = useCallback(async () => {
    const res = await apiFetch(`/api/members/me`, {
      credentials: "include",
    });

    if (!res.ok) return null;

    const data = await res.json();
    const me = data?.body ?? data;
    setUser(me);
    return me;
  }, [setUser]);

  const handleBackgroundUpdate = async () => {
    if (!selectedBackground) return;

    try {
      const res = await apiFetch(`/api/trees/backgrounds`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          background: selectedBackground,
        }),
      });

      if (!res.ok) throw new Error("background update failed");

      await refreshMe();
      setBackground(selectedBackground);
      setSelectedBackground(null);
    } catch (error) {
      console.error("배경 테마 변경 실패", error);
    }
  };

  const handleTreeUpdate = async () => {
    if (!selectedTree) return;

    try {
      const res = await apiFetch(`/api/trees/themes`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          theme: selectedTree,
        }),
      });

      if (!res.ok) throw new Error("tree update failed");

      await refreshMe();
      setTree(selectedTree);
      setSelectedTree(null);
    } catch (error) {
      console.error("트리 테마 변경 실패", error);
    }
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
            <BackgroundContainer onSubmit={handleBackgroundUpdate} />
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
