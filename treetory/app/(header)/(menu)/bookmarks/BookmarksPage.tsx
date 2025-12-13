"use client";

import ContentSection from "@/components/commons/ContentSection";
import PageHeading from "@/components/commons/PageHeading";
import SearchSection from "./SearchSection";
import BookmarksMembersList from "@/components/ui/menu/BookmarksMemberList";
import PaginationSection from "./PaginationSection";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getBookmarks } from "@/lib/api";
import { User } from "lucide-react";

export default function BookmarksPage() {
  const searchParams = useSearchParams();

  const query = searchParams.get("query") ?? "";
  const page = Number(searchParams.get("page") ?? 0);
  const size = Number(searchParams.get("size") ?? 6);

  const [members, setMembers] = useState([]);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getBookmarks({
        query: query,
        page: String(page),
        size: "6",
      });

      if (!data.body) return;
      setMembers(data.body.members.content);
      setTotalPage(data.body.totalPage);
    };

    fetchData();
  }, [query, page]);

  return (
    <>
      <PageHeading title="즐겨찾기" />
      <ContentSection className="no-scrollbar flex h-full flex-col overflow-y-auto md:p-10">
        <SearchSection initialQuery={query} />
        {members.length === 0 && (
          <div className="flex h-full flex-col items-center justify-center gap-4">
            <div className="text-muted-navy flex items-center rounded-full bg-white/50 p-4">
              <User size={32} />
            </div>
            <h1 className="text-body text-fg-tertiary text-center">
              즐겨찾기한 사용자가 없습니다.
            </h1>
          </div>
        )}
        <BookmarksMembersList members={members} />
        <PaginationSection page={page} totalPage={totalPage} query={query} />
      </ContentSection>
    </>
  );
}
