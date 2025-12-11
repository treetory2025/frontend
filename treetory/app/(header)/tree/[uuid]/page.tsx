import { getTreeOwner } from "@/lib/api";
import TreePage from "./TreePage";
import { Owner } from "@/types/user";

export default async function Page({
  params,
}: {
  params: Promise<{ uuid: string }>;
}) {
  // uuid 가져오기
  const { uuid } = await params;
  const owner = (await getTreeOwner(uuid)) as Owner;

  return <TreePage owner={owner} />;
}
