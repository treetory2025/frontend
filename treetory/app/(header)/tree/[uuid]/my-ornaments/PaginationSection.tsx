"use client";

import { usePathname, useRouter } from "next/navigation";

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
  const pathname = usePathname();

  const goToPage = (nextPage: number) => {
    if (nextPage < 1 || nextPage > totalPage) return;

    const params = new URLSearchParams();
    params.set("page", String(nextPage));
    if (query) params.set("query", query);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="mt-6 flex items-center justify-center gap-4 pt-5">
      <button
        disabled={page <= 1}
        onClick={() => goToPage(page - 1)}
        className="bg-muted-navy text-beige cursor-pointer rounded-full px-3 py-1 disabled:opacity-30"
      >
        이전
      </button>

      <span className="text-body font-bold">
        {page} / {totalPage}
      </span>

      <button
        disabled={page >= totalPage}
        onClick={() => goToPage(page + 1)}
        className="bg-muted-navy text-beige cursor-pointer rounded-full px-3 py-1 disabled:opacity-30"
      >
        다음
      </button>
    </div>
  );
}
