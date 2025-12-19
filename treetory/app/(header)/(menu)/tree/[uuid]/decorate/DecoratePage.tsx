"use client";

import { useEffect, useState, useDeferredValue } from "react";
import { Search } from "lucide-react";
import OrnamentTabs from "@/components/ui/decorate/OrnamentTabs";
import OrnamentGrid from "@/components/ui/decorate/OrnamentGrid";
import CreateOrnamentButton from "@/components/ui/decorate/CreateOrnamentButton";
import { getOrnaments, Ornaments as ApiOrnaments } from "@/lib/api";
import OrnamentDetailModal from "@/components/ui/decorate/OrnamentDetailModal";

export interface Ornament {
  ornamentId: number;
  name: string;
  imgUrl: string;
}

const CATEGORIES = [
  { id: "all", label: "전체", icon: "/icons/santa.png" },
  { id: "CHRISTMAS", label: "크리스마스", icon: "/icons/rudolph.png" },
  { id: "FOOD", label: "음식", icon: "/icons/rudolph.png" },
  { id: "ANIMAL", label: "동물", icon: "/icons/rudolph.png" },
  { id: "ETC", label: "기타", icon: "/icons/rudolph.png" },
];

export default function DecoratePage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  // 검색 입력과 실제 API에 보낼 검색어 분리
  const [inputValue, setInputValue] = useState("");
  const [searchWord, setSearchWord] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  // server-side data
  const [ornaments, setOrnaments] = useState<Ornament[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  // defer ornaments to avoid blocking rendering when list updates
  const deferredOrnaments = useDeferredValue(ornaments);
  const [selectedOrnamentId, setSelectedOrnamentId] = useState<number | null>(
    null,
  );

  // API 호출: 규칙 - selectedCategory === 'all' 이면 word/category 모두 전송하지 않음
  useEffect(() => {
    let mounted = true;

    async function fetchOrnaments() {
      setLoading(true);
      try {
        // 검색은 버튼 클릭(또는 Enter)으로 설정된 searchWord만 전송합니다.
        const wordToSend = searchWord.trim();
        const categoryToSend =
          selectedCategory === "all" ? "" : selectedCategory;

        const FRONT_PAGE_SIZE = 12;
        const BACKEND_PAGE_SIZE = 12;

        const backendPage = Math.floor(
          (currentPage * FRONT_PAGE_SIZE) / BACKEND_PAGE_SIZE,
        );

        const res: ApiOrnaments | null = await getOrnaments(
          wordToSend,
          categoryToSend,
          backendPage,
        );

        if (!mounted) return;

        if (res) {
          const backendContent = res.content || [];

          const overallStart = currentPage * FRONT_PAGE_SIZE;
          const backendStartIndex =
            backendPage * (res.pageSize ?? BACKEND_PAGE_SIZE);
          const offsetInBackend = Math.max(0, overallStart - backendStartIndex);

          let pageItems = backendContent.slice(
            offsetInBackend,
            offsetInBackend + FRONT_PAGE_SIZE,
          );

          if (pageItems.length < FRONT_PAGE_SIZE) {
            const nextBackendPage = backendPage + 1;
            const nextRes: ApiOrnaments | null = await getOrnaments(
              wordToSend,
              categoryToSend,
              nextBackendPage,
            );
            const nextContent = nextRes?.content || [];
            const combined = backendContent.concat(nextContent);
            pageItems = combined.slice(
              offsetInBackend,
              offsetInBackend + FRONT_PAGE_SIZE,
            );
          }

          setOrnaments(pageItems);

          const totalElements =
            res.totalElements ??
            (res.totalPage && res.pageSize
              ? res.totalPage * res.pageSize
              : backendContent.length);
          const tp = Math.max(
            1,
            Math.ceil(
              (totalElements ?? backendContent.length) / FRONT_PAGE_SIZE,
            ),
          );
          setTotalPages(tp);
        } else {
          setOrnaments([]);
          setTotalPages(1);
        }
      } catch (e) {
        setOrnaments([]);
        setTotalPages(1);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchOrnaments();

    return () => {
      mounted = false;
    };
  }, [selectedCategory, searchWord, currentPage]);

  return (
    <div
      className="no-scrollbar flex-1 overflow-y-auto p-4 pb-6 md:p-6"
      style={{ backgroundColor: "#CCE8F3" }}
    >
      {/* 검색 섹션 */}
      <div className="mb-6 flex gap-3">
        <div className="relative flex-1">
          <Search className="text-fg-secondary absolute top-1/2 left-3 size-5 -translate-y-1/2" />
          <input
            type="text"
            placeholder="장식 이름으로 검색해보세요!"
            className="bg-beige text-body placeholder-fg-secondary focus:ring-green w-full rounded-lg border-0 py-3 pr-4 pl-10 focus:ring-2 focus:outline-none"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setSearchWord(inputValue.trim());
                setCurrentPage(0);
              }
            }}
          />
        </div>
        <button
          className="bg-muted-navy text-beige rounded-lg px-4 py-3 font-semibold hover:opacity-90"
          onClick={() => {
            setSearchWord(inputValue.trim());
            setCurrentPage(0);
          }}
        >
          검색
        </button>
      </div>

      {/* 탭 섹션 */}
      <OrnamentTabs
        categories={CATEGORIES}
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setCurrentPage(0);
        }}
      />

      {/* 메시지와 버튼 */}
      <div className="mb-6 flex w-full items-center justify-between gap-4">
        <p className="text-caption text-fg-secondary md:text-body">
          나만의 특별한 장식이 필요하신가요?
        </p>
        <CreateOrnamentButton />
      </div>

      {/* 장식 그리드 */}
      <div className="-mx-4 md:-mx-6">
        <div className="my-4 h-px bg-white" />
      </div>
      <OrnamentGrid
        ornaments={deferredOrnaments}
        onSelect={(id) => setSelectedOrnamentId(id)}
      />

      {/* 선택된 장식 모달 */}
      <OrnamentDetailModal
        ornamentId={selectedOrnamentId}
        onClose={() => setSelectedOrnamentId(null)}
      />

      {/* 페이지네이션 */}
      {totalPages > 0 && (
        <div className="mt-6 w-full pb-8">
          <div className="flex items-center justify-center gap-4">
            <button
              disabled={currentPage <= 0}
              onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
              className="bg-muted-navy text-beige cursor-pointer rounded-full px-3 py-1 disabled:cursor-not-allowed disabled:opacity-30"
            >
              이전
            </button>

            <span className="text-body font-bold">
              {currentPage + 1} / {totalPages}
            </span>

            <button
              disabled={currentPage >= totalPages - 1}
              onClick={() =>
                setCurrentPage(Math.min(totalPages - 1, currentPage + 1))
              }
              className="bg-muted-navy text-beige cursor-pointer rounded-full px-3 py-1 disabled:cursor-not-allowed disabled:opacity-30"
            >
              다음
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
