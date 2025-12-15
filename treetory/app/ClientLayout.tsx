"use client";

import { useThemeStore } from "@/store/userStore";
import { usePathname } from "next/navigation";
import style from "@/app/clientLayoutCss.module.css";

export default function ClientRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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

  return (
    <div
      className={`h-full w-full ${bgClass} flex flex-col items-center justify-center`}
    >
      <div className={style.appContainer}>
        <main className="h-full">{children}</main>
      </div>
    </div>
  );
}
