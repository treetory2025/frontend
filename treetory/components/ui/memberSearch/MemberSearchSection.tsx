"use client";

import SearchInput from "@/components/commons/searchInput";
import { useEffect, useState } from "react";
import { SearchSlash } from "lucide-react";
import MemberPaginationSection from "./MemberPaginationSection";
import type { Member } from "@/types/user";
import { useRouter } from "next/navigation";

export default function MemberSearchSection() {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [totalElements, setTotalElements] = useState(0);

  const size = 5;

  const [members, setMembers] = useState<Member[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (!hasSearched) return;

    const fetchMembers = async () => {
      try {
        const res = await fetch(
          `/api/members?query=${input.trim()}&page=${page}&size=${size}`,
        );

        if (!res.ok) {
          console.log("사용자 검색 결과 없음");
          return;
        }

        const data = await res.json();
        if (!data?.body) return;

        setMembers(data.body.members);
        setTotalPage(data.body.totalPage);
        setTotalElements(data.body.totalElements);
      } catch (error) {
        console.error("사용자 검색 실패", error);
      }
    };

    fetchMembers();
  }, [page, hasSearched, input, size]);

  const onSubmit = () => {
    if (!input.trim()) return;

    setHasSearched(true);
    setPage(0);
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
      {(!hasSearched || input.length === 0) && (
        <div className="flex h-full w-full items-center justify-center">
          <p className="text-fg-secondary">검색어를 입력해주세요.</p>
        </div>
      )}
      {hasSearched && members.length === 0 && (
        <div className="flex h-full flex-col items-center justify-center gap-6">
          <div className="text-muted-navy bg-muted-navy/50 flex items-center rounded-full p-4">
            <SearchSlash size={32} />
          </div>
          <p className="text-body text-fg-tertiary">검색 결과가 없습니다.</p>
        </div>
      )}
      {members.length > 0 && (
        <div className="no-scrollbar flex h-full flex-col gap-3 overflow-y-auto">
          <div className="border-green my-4 flex w-full justify-between border-b-2 pb-2">
            <p className="text-body text-fg-secondary">
              <span className="text-green font-bold">{input}</span>에 대한 검색
              결과입니다.
            </p>
            <p className="text-fg-secondary font-bold">{totalElements}건</p>
          </div>
          <div className="no-scrollbar mb-4 flex h-full w-full flex-col gap-4 overflow-y-auto">
            {members.map((member) => (
              <div
                key={member.memberId}
                className="flex items-center justify-between"
              >
                <div className="flex flex-col gap-1">
                  <p className="text-body text-fg-primary font-bold">
                    {member.nickname}
                  </p>
                  <p className="text-fg-tertiary text-caption">
                    {member.email}
                  </p>
                </div>
                <div className="flex flex-col justify-end gap-1">
                  <p className="text-body text-green text-right">
                    <span className="font-bold">트리 장식 개수 </span>
                    {member.ornamentsCount}
                  </p>
                  <button
                    className="text-button bg-muted-navy text-beige cursor-pointer rounded-full px-8 py-1"
                    onClick={() => router.push(`/tree/${member.memberId}`)}
                  >
                    방문하기
                  </button>
                </div>
              </div>
            ))}
            <MemberPaginationSection
              page={page}
              totalPage={totalPage}
              onChangePage={(nextPage) => setPage(nextPage)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
