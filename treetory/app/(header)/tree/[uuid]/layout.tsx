import { getTreeOwner } from "@/lib/api";
import { Owner } from "@/types/user";
import { OwnerProvider } from "@/app/(header)/tree/[uuid]/tree-context";
import TreeHeader from "@/components/ui/tree/Header";

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
