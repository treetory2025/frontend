"use client";

import { useEffect, useState, useDeferredValue } from "react";
import { Search } from 'lucide-react';
import OrnamentTabs from '@/components/ui/decorate/OrnamentTabs';
import OrnamentGrid from '@/components/ui/decorate/OrnamentGrid';
import CreateOrnamentButton from '@/components/ui/decorate/CreateOrnamentButton';
import { getOrnaments, Ornaments as ApiOrnaments } from '@/lib/api';
import OrnamentDetailModal from '@/components/ui/decorate/OrnamentDetailModal';

export interface Ornament {
  ornamentId: number;
  name: string;
  imgUrl: string;
}

const CATEGORIES = [
  { id: 'all', label: '전체', icon: '🎄' },
  { id: 'CHRISTMAS', label: '크리스마스', icon: '🎄' },
  { id: 'FOOD', label: '음식', icon: '🦌' },
  { id: 'ANIMAL', label: '동물', icon: '🦌' },
  { id: 'ETC', label: '기타', icon: '🦌' },
];

export default function DecoratePage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  // 검색 입력과 실제 API에 보낼 검색어 분리
  const [inputValue, setInputValue] = useState('');
  const [searchWord, setSearchWord] = useState('');
  const [currentPage, setCurrentPage] = useState(0);

  // server-side data
  const [ornaments, setOrnaments] = useState<Ornament[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  // defer ornaments to avoid blocking rendering when list updates
  const deferredOrnaments = useDeferredValue(ornaments);
  const [selectedOrnamentId, setSelectedOrnamentId] = useState<number | null>(null);

  // API 호출: 규칙 - selectedCategory === 'all' 이면 word/category 모두 전송하지 않음
  useEffect(() => {
    let mounted = true;

    async function fetchOrnaments() {
      setLoading(true);
      try {
        // 검색은 버튼 클릭(또는 Enter)으로 설정된 searchWord만 전송합니다.
        const wordToSend = searchWord.trim();
        const categoryToSend = selectedCategory === 'all' ? '' : selectedCategory;

        const res: ApiOrnaments | null = await getOrnaments(wordToSend, categoryToSend, currentPage);

        if (!mounted) return;

        if (res) {
          setOrnaments(res.content || []);
          // API가 totalPage를 제공하면 사용, 없으면 계산
          const tp = (res.totalPage ?? Math.max(1, Math.ceil((res.totalElements ?? (res.content?.length||0)) / (res.pageSize || 6)))) || 1;
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
    <div className="flex-1 overflow-y-auto p-4 md:p-6" style={{ backgroundColor: '#CCE8F3' }}>
      {/* 검색 섹션 */}
      <div className="mb-6 flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-fg-secondary" />
          <input
            type="text"
            placeholder="장식 이름으로 검색해보세요!"
            className="w-full rounded-lg border-0 bg-beige py-3 pl-10 pr-4 text-body placeholder-fg-secondary focus:outline-none focus:ring-2 focus:ring-green"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setSearchWord(inputValue.trim());
                setCurrentPage(0);
              }
            }}
          />
        </div>
        <button
          className="rounded-lg bg-muted-navy px-4 py-3 font-semibold text-beige hover:opacity-90"
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
      <div className="mb-6 flex items-center justify-between gap-4">
        <p className="text-body text-fg-secondary" style={{ fontSize: '12px' }}>
          나만의 특별한 장식이 필요하신가요?
        </p>
        <CreateOrnamentButton />
      </div>

      {/* 장식 그리드 */}
      <OrnamentGrid ornaments={deferredOrnaments} onSelect={(id) => setSelectedOrnamentId(id)} />

      {/* 선택된 장식 모달 */}
      <OrnamentDetailModal ornamentId={selectedOrnamentId} onClose={() => setSelectedOrnamentId(null)} />

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          <button
            onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
            disabled={currentPage === 0}
            className="px-3 py-1 rounded disabled:opacity-50 border"
          >
            &lt;
          </button>

          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx)}
              className={`px-3 py-1 rounded font-semibold ${
                idx === currentPage ? 'bg-muted-navy text-beige' : 'bg-beige text-fg-primary'
              }`}
            >
              {idx + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
            disabled={currentPage === totalPages - 1}
            className="px-3 py-1 rounded disabled:opacity-50 border"
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
}
