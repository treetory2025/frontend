"use client";

import { useThemeStore } from "@/store/userStore";
import { usePathname } from "next/navigation";
import style from "@/app/clientLayoutCss.module.css";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ClientRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const pathname = usePathname();
  const isTreeRoute = pathname.startsWith("/tree");
  const theme = useThemeStore((s) => s.theme);

  const bgClass = isTreeRoute
    ? theme === "SILENT_NIGHT"
      ? "bg-navy"
      : theme === "SNOWY_HILL"
        ? "bg-skyblue"
        : "bg-navy"
    : "bg-navy";

  const isReady = mounted && !!bgClass;

  if (!isReady) {
    return (
      <div className="text-heading text-beige font-memoment bg-navy flex h-full w-full items-center justify-center">
        트리토리 진입중. . .
      </div>
    );
  }

  return (
    <motion.div
      className={`flex h-full w-full flex-col items-center justify-center ${bgClass}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className={style.appContainer}>
        <main className="h-full">{children}</main>
      </div>
    </motion.div>
  );
}
