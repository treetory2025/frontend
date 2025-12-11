"use client";
import { useOwner } from "@/app/(header)/tree/[uuid]/tree-context";
import { List, RotateCw } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

export default function TreeHeader() {
  const owner = useOwner();
  const router = useRouter();
  const params = useParams();
  const uuid = params.uuid;

  return (
    <header className="flex flex-col gap-2 select-none">
      <div>
        <p className="font-memoment text-beige text-body md:text-xl">
          새로운 장식을 확인해보세요!
        </p>
        <h1 className="text-title font-memoment text-beige">
          {owner.nickname}님의 <span className="text-green">트리토리</span>
        </h1>
      </div>

      <div className="bg-skyblue/20 text-beige text-caption flex w-full items-center justify-between rounded-md px-6 py-1.5">
        <p className="flex items-center gap-2">
          현재 등록된 장식
          <span className="font-bold">{owner.ornamentsRes?.length}개</span>
        </p>
        <div className="flex items-center gap-3 md:gap-4">
          <button
            className="bg-beige text-muted-navy cursor-pointer rounded-2xl p-2"
            onClick={() => router.push(`/tree/${uuid}/ornaments`)}
          >
            <List size={20} strokeWidth={3} />
          </button>
          <button className="bg-muted-navy text-beige cursor-pointer rounded-full p-2">
            <RotateCw size={20} strokeWidth={3} />
          </button>
        </div>
      </div>
    </header>
  );
}
