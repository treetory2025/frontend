"use client";
import { useOwner } from "@/app/(header)/tree/[uuid]/tree-context";

export default function TreeHeader() {
  const owner = useOwner();

  return (
    <header>
      <p>{owner.nickname}님의 트리토리</p>
    </header>
  );
}
