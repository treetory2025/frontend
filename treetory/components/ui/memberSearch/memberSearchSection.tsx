"use client";

import SearchInput from "@/components/commons/searchInput";
import { useState } from "react";
import { SearchSlash } from "lucide-react";

export default function MemberSearchSection() {
  const [input, setInput] = useState("");

  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(1);

  const size = 5;

  const [members, setMembers] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const onSubmit = async () => {
    if (!input.trim()) return;

    setHasSearched(true);

    try {
      const res = await fetch(
        `/api/members?query=${input.trim()}&page=${page}&size=${size}`,
      );

      if (!res.ok || res.status === 400) {
        console.log("사용자 검색 결과 없음", res.body);
        return;
      }

      const data = await res.json();
      if (!data.body) return;

      setMembers(data.body.members);
      setPage(data.body.pageNum);
      setTotalPage(data.body.totalPage);
    } catch (error) {
      console.error("사용자 검색 실패", error);
    }
  };

  return (
    <div className="h-[60dvh] w-full">
      <SearchInput
        value={input}
        placeholder="닉네임, 이메일 계정 검색"
        onChange={(e) => setInput(e.target.value)}
        onSubmit={onSubmit}
        onKeyDown={(e) => e.key === "Enter" && onSubmit()}
      />
      {hasSearched && members.length === 0 && (
        <div className="flex h-full flex-col items-center justify-center gap-6">
          <div className="text-muted-navy bg-muted-navy/50 flex items-center rounded-full p-4">
            <SearchSlash size={32} />
          </div>
          <p className="text-body text-fg-tertiary">검색 결과가 없습니다.</p>
        </div>
      )}
    </div>
  );
}
