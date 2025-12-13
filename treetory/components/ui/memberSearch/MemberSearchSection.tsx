"use client";

import SearchInput from "@/components/commons/searchInput";
import { useState } from "react";
import { SearchSlash } from "lucide-react";

const testMembers = [
  {
    memberId: "a1f2c3d4-1111-2222-3333-444455556666",
    nickname: "프론트엔드왕",
    email: "frontend@treetory.com",
    ornamentsCount: 3,
  },
  {
    memberId: "b2c3d4e5-7777-8888-9999-000011112222",
    nickname: "리액트고수",
    email: "react@treetory.com",
    ornamentsCount: 1,
  },
  {
    memberId: "c3d4e5f6-aaaa-bbbb-cccc-ddddeeeeffff",
    nickname: "타입스크립트",
    email: "ts@treetory.com",
    ornamentsCount: 5,
  },
  {
    memberId: "d4e5f6a7-1234-5678-9012-abcdefabcdef",
    nickname: "테스트유저3",
    email: "test3@test.com",
    ornamentsCount: 0,
  },
  {
    memberId: "e5f6a7b8-fedc-ba98-7654-3210fedcba98",
    nickname: "트리토리팬",
    email: "fan@treetory.com",
    ornamentsCount: 2,
  },
  {
    memberId: "e5f6a7b8-fedc-ba98-7654-3210fedcba9ㄹㅇ8",
    nickname: "트리토리팬",
    email: "fan@treetory.com",
    ornamentsCount: 2,
  },
];

export default function MemberSearchSection() {
  const [input, setInput] = useState("");

  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [totalElements, setTotalElements] = useState(0);

  const size = 5;

  const [members, setMembers] = useState(testMembers);
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
      setTotalElements(data.body.totalElements);
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
                  <button className="text-button bg-muted-navy text-beige rounded-full px-8 py-1">
                    방문하기
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
