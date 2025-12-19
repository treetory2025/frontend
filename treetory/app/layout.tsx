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

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
export const metadata: Metadata = {
  title: "Treetory 2025",
  description: "함께 만드는 우리만의 크리스마스 이야기, 트리토리",
  openGraph: {
    title: "Treetory 2025",
    description: "함께 만드는 우리만의 크리스마스 이야기, 트리토리",
    url: SITE_URL, // 배포 사이트 연결 전
    siteName: "트리토리",
    locale: "ko_KR",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Treetory 2025",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Treetory 2025",
    description: "함께 만드는 우리만의 크리스마스 이야기, 트리토리",
    images: [`${SITE_URL}/og-image.png`],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
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
