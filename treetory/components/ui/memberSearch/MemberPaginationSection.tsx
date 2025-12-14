"use client";

export default function MemberPaginationSection({
  page,
  totalPage,
  onChangePage,
}: {
  page: number;
  totalPage: number;
  onChangePage: (page: number) => void;
}) {
  return (
    <div className="mt-6 flex items-center justify-center gap-4">
      <button
        disabled={page <= 0}
        onClick={() => onChangePage(page - 1)}
        className="bg-muted-navy text-beige cursor-pointer rounded-full px-3 py-1 disabled:opacity-30"
      >
        이전
      </button>

      <span className="text-body font-bold">
        {page + 1} / {totalPage}
      </span>

      <button
        disabled={page >= totalPage - 1}
        onClick={() => onChangePage(page + 1)}
        className="bg-muted-navy text-beige cursor-pointer rounded-full px-3 py-1 disabled:opacity-30"
      >
        다음
      </button>
    </div>
  );
}
