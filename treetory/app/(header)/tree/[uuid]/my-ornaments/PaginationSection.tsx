"use client";

import { useRouter } from "next/navigation";

export default function PaginationSection({
  page,
  totalPage,
  query,
}: {
  page: number;
  totalPage: number;
  query?: string;
}) {
  const router = useRouter();

  const goToPage = (nextPage: number) => {
    const params = new URLSearchParams();
    params.set("page", String(nextPage));
    if (query) params.set("query", query);
    router.push(`/bookmarks?${params.toString()}`);
  };

  return (
    <div className="mt-6 flex items-center justify-center gap-4">
      <button
        disabled={page <= 0}
        onClick={() => goToPage(page - 1)}
        className="bg-muted-navy text-beige cursor-pointer rounded-full px-3 py-1 disabled:opacity-30"
      >
        이전
      </button>

      <span className="text-body font-bold">
        {page + 1} / {totalPage}
      </span>

      <button
        disabled={page >= totalPage - 1}
        onClick={() => goToPage(page + 1)}
        className="bg-muted-navy text-beige cursor-pointer rounded-full px-3 py-1 disabled:opacity-30"
      >
        다음
      </button>
    </div>
  );
}
