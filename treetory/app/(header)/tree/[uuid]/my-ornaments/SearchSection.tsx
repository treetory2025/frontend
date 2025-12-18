"use client";

import { useRouter } from "next/navigation";
import SearchInput from "@/components/commons/searchInput";
import { useState } from "react";

export default function SearchSection({
  initialQuery,
}: {
  initialQuery: string;
}) {
  const router = useRouter();
  const [input, setInput] = useState(initialQuery);

  const onSubmit = () => {
    const params = new URLSearchParams();
    if (input.trim()) params.set("query", input);
    params.set("page", "0");

    router.push(`/bookmarks?${params.toString()}`);
  };

  return (
    <SearchInput
      value={input}
      placeholder="닉네임으로 검색해보세요!"
      onChange={(e) => setInput(e.target.value)}
      onSubmit={onSubmit}
      onKeyDown={(e) => e.key === "Enter" && onSubmit()}
    />
  );
}
