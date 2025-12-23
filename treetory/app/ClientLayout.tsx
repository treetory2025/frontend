"use client";

import { useThemeStore } from "@/store/userStore";
import { usePathname } from "next/navigation";
import style from "@/app/clientLayoutCss.module.css";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AlertModal from "@/components/commons/AlertModal";
import InviteModal from "@/components/ui/menu/InviteModal";
import MusicProvider from "./MusicProvider";
import BGMButton from "@/components/ui/menu/BGMButton";
import { useOpenExternalBrowser } from "@/hooks/useOpenExternalBrowser";
import { useAlert } from "@/hooks/useAlert";

const TREE_THEME_BG_MAP: Record<string, string> = {
  SILENT_NIGHT: "bg-navy",
  SNOWY_HILL: "bg-skyblue",
};

function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="bg-navy font-memoment text-heading text-beige flex h-full w-full items-center justify-center"
    >
      트리토리 진입중. . .
    </motion.div>
  );
}

export default function ClientRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { openExternalBrowser } = useOpenExternalBrowser();
  const alert = useAlert();

  // 카카오 인앱 브라우저 이동
  useEffect(() => {
    if (typeof window === "undefined") return;

    const ua = navigator.userAgent.toLowerCase();
    const isKakaoInApp = ua.includes("kakaotalk");
    if (!isKakaoInApp) return;

    if (sessionStorage.getItem("kakao-forced")) return;
    sessionStorage.setItem("kakao-forced", "true"); // 무한 루프 방지를 위한 세션 저장

    const url = window.location.href;
    alert("원활한 서비스 사용을 위해\n외부 브라우저로 이동합니다", () =>
      openExternalBrowser(url),
    );
  }, []);

  const pathname = usePathname();
  const theme = useThemeStore((s) => s.theme);

  const THEME_ALLOWED_ROUTES = ["/tree", "/bookmarks", "/settings"];
  const isThemeAllowedRoute = THEME_ALLOWED_ROUTES.some((path) =>
    pathname.startsWith(path),
  );

  const MIN_LOADING_TIME = 50;

  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setReady(true);
    }, MIN_LOADING_TIME);

    return () => clearTimeout(timer);
  }, []);

  if (!ready) {
    return <LoadingScreen />;
  }

  const bgClass =
    theme && isThemeAllowedRoute
      ? (TREE_THEME_BG_MAP[theme] ?? "bg-navy")
      : "bg-navy";

  return (
    <MusicProvider>
      <motion.div
        className={`min-h-vdh no-scrollbar flex w-full flex-col items-center justify-center overflow-y-auto ${bgClass}`}
        initial={{ opacity: 0.3 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className={style.appContainer}>
          <AlertModal />
          <InviteModal />

          <main className="h-full">{children}</main>
          <BGMButton />
        </div>
      </motion.div>
    </MusicProvider>
  );
}
