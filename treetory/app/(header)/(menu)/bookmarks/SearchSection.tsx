"use client";

import { useRouter } from "next/navigation";
import SearchInput from "@/components/commons/searchInput";
import { useState } from "react";

export default function SearchSection() {
  const router = useRouter();
  const [input, setInput] = useState("");

  const onSubmit = () => {
    router.push(`/bookmarks?query=${input}`);
  };

  return (
    <SearchInput
      value={input}
      placeholder="닉네임, 이메일 계정 검색"
      onChange={(e) => setInput(e.target.value)}
      onSubmit={onSubmit}
      onKeyDown={(e) => e.key === "Enter" && onSubmit()}
    />
  );
}
