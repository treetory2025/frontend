import TreePage from "@/app/(header)/tree/[uuid]/TreePage";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Treetory 2025`,
    description: `함께 만드는 우리의 크리스마스 이야기`,
    openGraph: {
      title: `트리토리 2025`,
      description: `함께 만드는 우리의 크리스마스 이야기`,
      images: [
        {
          url: "https://treetory.co.kr/og-invite-image.png",
          width: 1200,
          height: 630,
          alt: "트리토리 크리스마스 초대",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `트리토리 초대 링크`,
      description: `함께 만드는 우리의 크리스마스 이야기`,
      images: ["https://treetory.co.kr/og-invite-image.png"],
    },
  };
}

export default function Page() {
  return <TreePage />;
}
