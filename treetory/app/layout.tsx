import type { Metadata } from "next";
import "@/app/globals.css";
import Header from "@/components/commons/Header";

export const metadata: Metadata = {
  title: "Treetory 2025",
  description: "함께 만드는 우리만의 크리스마스 이야기, 트리토리",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kr">
      <body>
        <div className="app-container">
          <header>
            <Header />
          </header>
          <main className="h-full">{children}</main>
        </div>
      </body>
    </html>
  );
}
