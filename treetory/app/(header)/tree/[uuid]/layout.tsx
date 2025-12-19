import { getTreeOwner } from "@/lib/api";
import { Owner } from "@/types/user";
import { OwnerProvider } from "@/app/(header)/tree/[uuid]/tree-context";
import TreeHeader from "@/components/ui/tree/Header";
import { Metadata } from "next";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ uuid: string }>;
}) {
  // uuid 가져오기
  const { uuid } = await params;
  const owner = (await getTreeOwner(uuid)) as Owner;

  return (
    <OwnerProvider initialOwner={owner} uuid={uuid}>
      <div className="flex h-full w-full flex-col justify-between">
        <TreeHeader />
        <div className="no-scrollbar h-full overflow-y-auto">{children}</div>
      </div>
    </OwnerProvider>
  );
}

type MetadataProps = {
  params: { uuid: string };
};

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const { uuid } = params;
  const owner = (await getTreeOwner(uuid)) as Owner;

  const SITE_URL = "https://develop.bacinf.com";

  const title = `${owner.nickname}의 트리 | 트리토리`;
  const description = `${owner.nickname}와 함께 만드는 크리스마스 이야기`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/tree/${uuid}`,
      siteName: "트리토리",
      locale: "ko_KR",
      images: [
        {
          url: `${SITE_URL}/og-image.png`, // 트리별 이미지 없을 경우 fallback
          width: 1200,
          height: 630,
          alt: `${owner.nickname}의 트리`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}/og-image.png`],
    },
  };
}
