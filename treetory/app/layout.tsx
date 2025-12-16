import type { Metadata, Viewport } from "next";
import "@/app/globals.css";
import localFont from "next/font/local";
import ClientRootLayout from "./ClientLayout";

const treetoryFont = localFont({
  src: [
    {
      path: "../public/fonts/MemomentKkukkukk.ttf",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-memoment",
});

export const metadata: Metadata = {
  title: "Treetory 2025",
  description: "함께 만드는 우리만의 크리스마스 이야기, 트리토리",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kr" className={treetoryFont.variable}>
      <body className="h-full w-full">
        <ClientRootLayout>{children}</ClientRootLayout>
      </body>
    </html>
  );
}
