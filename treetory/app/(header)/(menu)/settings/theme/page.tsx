"use client";

import { useState, useEffect, useCallback } from "react";
import { useUserStore } from "@/store/userStore";

import ContentSection from "@/components/commons/ContentSection";
import PageHeading from "@/components/commons/PageHeading";
import Tab from "@/components/commons/Tab";
import BackgroundContainer from "@/components/ui/settings/Theme/BackgroundContainer";
import TreeContainer from "@/components/ui/settings/Theme/TreeContaier";
import { apiFetch } from "@/lib/api";
import {
  BackgroundType,
  TreeType,
  BACKGROUND_OPTIONS,
  TREE_OPTIONS,
} from "@/types/theme";

import { useAlert } from "@/hooks/useAlert";

const THEME_TABS = [
  { label: "배경", value: "background" },
  { label: "트리", value: "tree" },
];
type ThemeTab = (typeof THEME_TABS)[number]["value"];

export default function Page() {
  const user = useUserStore((s) => s.user);
  const setUser = useUserStore.getState().setUser;
  const hasHydrated = useUserStore((s) => s._hasHydrated);

  const [tab, setTab] = useState<ThemeTab>("background");

  // 서버 기준
  const [background, setBackground] = useState<BackgroundType>("SILENT_NIGHT");
  const [tree, setTree] = useState<TreeType>("SNOWY");

  useEffect(() => {
    if (!hasHydrated || !user) return;
    setBackground((user.background as BackgroundType) ?? "SILENT_NIGHT");
    setTree((user.theme as TreeType) ?? "SNOWY");
  }, [hasHydrated, user]);

  // 사용자 정보 갱신 콜백
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

  //
  const handleBackgroundUpdate = async (background: BackgroundType) => {
    try {
      const res = await apiFetch(`/api/trees/backgrounds`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          background: background,
        }),
      });

      if (!res.ok) throw new Error("background update failed");

      await refreshMe();
      setBackground(background);
      alert("배경 테마 변경 완료");
    } catch (error) {
      console.error("배경 테마 변경 실패", error);
    }
  };

  const handleTreeUpdate = async (tree: TreeType) => {
    try {
      const res = await apiFetch(`/api/trees/themes`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          theme: tree,
        }),
      });

      if (!res.ok) throw new Error("tree update failed");

      await refreshMe();
      setTree(tree);
      alert("트리 테마 변경 완료");
    } catch (error) {
      console.error("트리 테마 변경 실패", error);
    }
  };

  return (
    <>
      <PageHeading title="테마 설정" />
      <ContentSection className="flex h-full flex-col gap-3 md:h-dvh">
        <Tab options={THEME_TABS} value={tab} onChange={setTab} />

        {tab === "background" && (
          <>
            <div className="flex flex-col rounded-xl bg-white p-4">
              <p className="text-caption md:text-body text-muted-navy">
                현재 적용된 테마
              </p>
              <p className="text-navy text-subtitle">
                {
                  BACKGROUND_OPTIONS.find((opt) => opt.value === background)
                    ?.label
                }
              </p>
            </div>
            <BackgroundContainer
              onSubmit={handleBackgroundUpdate}
              currentBackground={user?.background as BackgroundType}
            />
          </>
        )}

        {tab === "tree" && (
          <>
            <div className="flex flex-col rounded-xl bg-white p-4">
              <p className="text-caption md:text-body text-muted-navy">
                현재 적용된 테마
              </p>
              <p className="text-navy text-subtitle">
                {TREE_OPTIONS.find((opt) => opt.value === tree)?.label}
              </p>
            </div>
            <TreeContainer
              onSubmit={handleTreeUpdate}
              currentTree={user?.theme as TreeType}
            />
          </>
        )}
      </ContentSection>
    </>
  );
}
