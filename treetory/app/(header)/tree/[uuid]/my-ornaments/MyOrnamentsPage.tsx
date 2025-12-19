"use client";

import ContentSection from "@/components/commons/ContentSection";
import { useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useOwner } from "@/app/(header)/tree/[uuid]/tree-context";
import { Ornarment } from "@/types/ornarment";
import { CandyCane } from "lucide-react";
import MyOrnaments from "@/components/ui/myOrnaments/MyOrnaments";
import PaginationSection from "./PaginationSection";

// pagination size
const PAGE_SIZE = 6;

export default function MyOrnamentsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { owner } = useOwner();

  // query params
  const page = Math.max(Number(searchParams.get("page") ?? "1"), 1);

  //data
  const ornaments = owner?.ornamentsRes as Ornarment[] | undefined;
  const isLoading = ornaments === undefined;

  if (!ornaments) return;
  // pagination
  const totalPage = Math.max(1, Math.ceil(ornaments.length / PAGE_SIZE));

  useEffect(() => {
    if (page > totalPage) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", "1");
      router.replace(`?${params.toString()}`);
    }
  }, [page, totalPage, router, searchParams]);

  const paginatedOrnaments = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    return ornaments.slice(start, end);
  }, [ornaments, page]);
  return (
    <>
      <ContentSection className="no-scrollbar flex h-full flex-col overflow-y-auto md:p-10">
        {/* 데이터 없음 */}
        {!isLoading && ornaments.length === 0 && (
          <div className="flex flex-1 flex-col items-center justify-center gap-4">
            <div className="text-muted-navy rounded-full bg-white/50 p-4">
              <CandyCane size={32} />
            </div>
            <h1 className="text-body text-fg-tertiary text-center">
              아직 등록된 장식이 없습니다.
            </h1>
          </div>
        )}

        {/* 리스트 + 페이지네이션 */}
        {!isLoading && ornaments.length > 0 && (
          <div className="no-scrollbar h-full overflow-y-auto">
            <MyOrnaments ornaments={paginatedOrnaments} />
            <PaginationSection page={page} totalPage={totalPage} />
          </div>
        )}
      </ContentSection>
    </>
  );
}
