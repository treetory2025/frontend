"use client";

import { useThemeStore } from "@/store/userStore";
import { usePathname } from "next/navigation";
import style from "@/app/clientLayoutCss.module.css";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

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
  const pathname = usePathname();
  const theme = useThemeStore((s) => s.theme);
  const isTreeRoute = pathname.startsWith("/tree");

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
    isTreeRoute && theme ? (TREE_THEME_BG_MAP[theme] ?? "bg-navy") : "bg-navy";

  return (
    <motion.div
      className={`flex h-full w-full flex-col items-center justify-center ${bgClass}`}
      initial={{ opacity: 0.3 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className={style.appContainer}>
        <main className="h-full">{children}</main>
      </div>
    </motion.div>
  );
}
