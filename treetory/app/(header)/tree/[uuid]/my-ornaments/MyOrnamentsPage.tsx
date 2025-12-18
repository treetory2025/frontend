"use client";

import ContentSection from "@/components/commons/ContentSection";
import SearchInput from "@/components/commons/searchInput";
import { useEffect, useState } from "react";
import SearchSection from "./SearchSection";
import { useSearchParams } from "next/navigation";
import { useOwner } from "@/app/(header)/tree/[uuid]/tree-context";
import { Ornarment } from "@/types/ornarment";
import { CandyCane } from "lucide-react";
import MyOrnaments from "@/components/ui/myOrnaments/MyOrnaments";
import PaginationSection from "./PaginationSection";
import Tab from "@/components/commons/Tab";

const SORT_TABS = [
  { label: "최신순", value: "latest" },
  { label: "오래된순", value: "oldest" },
];

type SortTab = (typeof SORT_TABS)[number]["value"];

export default function MyOrnamentsPage() {
  const searchParams = useSearchParams();

  const { owner } = useOwner();

  const ornaments = owner.ornamentsRes as Ornarment[]; // 등록된 장식 오너먼트 리스트
  const isLoading = ornaments === undefined;
  const [totalPage, setTotalPage] = useState(1);
  const page = Math.max(Number(searchParams.get("page") ?? "1"), 1);
  const size = 6; // 6명씩 페이지네이션
  const query = searchParams.get("query") ?? "";

  const [tab, setTab] = useState<SortTab>("background");

  return (
    <>
      <ContentSection className="no-scrollbar flex h-full flex-col md:p-10">
        <div className="flex flex-col gap-6">
          <Tab options={SORT_TABS} value={tab} onChange={setTab} />

          <SearchSection initialQuery={query} />
        </div>
        {isLoading ? (
          <div className="flex h-full flex-col items-center justify-center gap-4">
            <h1 className="text-body text-fg-tertiary text-center">
              등록된 장식 데이터를 조회중입니다.
            </h1>
          </div>
        ) : ornaments.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-4">
            <div className="text-muted-navy flex items-center rounded-full bg-white/50 p-4">
              <CandyCane size={32} />
            </div>
            <h1 className="text-body text-fg-tertiary text-center">
              아직 등록된 장식이 없습니다.
            </h1>
          </div>
        ) : (
          <div className="flex h-full flex-col justify-between">
            <MyOrnaments ornaments={ornaments} />
            <PaginationSection page={page} totalPage={totalPage} />
          </div>
        )}
      </ContentSection>
    </>
  );
}
