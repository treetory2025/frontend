'use client';

import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import OrnamentTabs from '@/components/ui/decorate/OrnamentTabs';
import OrnamentGrid from '@/components/ui/decorate/OrnamentGrid';
import CreateOrnamentButton from '@/components/ui/decorate/CreateOrnamentButton';

export interface Ornament {
  ornamentId: number;
  name: string;
  imgUrl: string;
}

// Mock 데이터 - 실제 API 응답 구조 참고
// GET /api/ornaments?word={word}&category={category}&page={page}
// Response:
// {
//   "header": { "message": "OK" },
//   "body": {
//     "ornaments": {
//       "content": [
//         { "ornamentId": 1, "name": "name", "imgUrl": "url" }
//       ],
//       "pageNum": 0,
//       "pageSize": 18,
//       "totalPage": 1,
//       "totalElements": 1
//     }
//   }
// }
const MOCK_ORNAMENTS: Ornament[] = [
  {
    ornamentId: 1,
    name: '눈사람 장식',
    imgUrl: 'https://treetory.s3.ap-northeast-2.amazonaws.com/members/b8a3eb59-b956-4df9-8a55-80784016b8d4/ornaments/dc8f6be5-9103-4122-bd4a-0d0fe1da3f41:upload_2025-12-09-15.42.02.png',
  },
  {
    ornamentId: 2,
    name: '금색 공 장식',
    imgUrl: 'https://treetory.s3.ap-northeast-2.amazonaws.com/members/b8a3eb59-b956-4df9-8a55-80784016b8d4/ornaments/dc8f6be5-9103-4122-bd4a-0d0fe1da3f41:upload_2025-12-09-15.42.02.png',
  },
  {
    ornamentId: 3,
    name: '빨간 리본 장식',
    imgUrl: 'https://treetory.s3.ap-northeast-2.amazonaws.com/members/b8a3eb59-b956-4df9-8a55-80784016b8d4/ornaments/dc8f6be5-9103-4122-bd4a-0d0fe1da3f41:upload_2025-12-09-15.42.02.png',
  },
  {
    ornamentId: 4,
    name: '별 장식',
    imgUrl: 'https://treetory.s3.ap-northeast-2.amazonaws.com/members/b8a3eb59-b956-4df9-8a55-80784016b8d4/ornaments/dc8f6be5-9103-4122-bd4a-0d0fe1da3f41:upload_2025-12-09-15.42.02.png',
  },
  {
    ornamentId: 5,
    name: '종 장식',
    imgUrl: 'https://treetory.s3.ap-northeast-2.amazonaws.com/members/b8a3eb59-b956-4df9-8a55-80784016b8d4/ornaments/dc8f6be5-9103-4122-bd4a-0d0fe1da3f41:upload_2025-12-09-15.42.02.png',
  },
  {
    ornamentId: 6,
    name: '캔디 스틱',
    imgUrl: 'https://treetory.s3.ap-northeast-2.amazonaws.com/members/b8a3eb59-b956-4df9-8a55-80784016b8d4/ornaments/dc8f6be5-9103-4122-bd4a-0d0fe1da3f41:upload_2025-12-09-15.42.02.png',
  },
  {
    ornamentId: 7,
    name: '캔디 스틱',
    imgUrl: 'https://treetory.s3.ap-northeast-2.amazonaws.com/members/b8a3eb59-b956-4df9-8a55-80784016b8d4/ornaments/dc8f6be5-9103-4122-bd4a-0d0fe1da3f41:upload_2025-12-09-15.42.02.png',
  },
  {
    ornamentId: 8,
    name: '캔디 스틱',
    imgUrl: 'https://treetory.s3.ap-northeast-2.amazonaws.com/members/b8a3eb59-b956-4df9-8a55-80784016b8d4/ornaments/dc8f6be5-9103-4122-bd4a-0d0fe1da3f41:upload_2025-12-09-15.42.02.png',
  },
  {
    ornamentId: 9,
    name: '캔디 스틱',
    imgUrl: 'https://treetory.s3.ap-northeast-2.amazonaws.com/members/b8a3eb59-b956-4df9-8a55-80784016b8d4/ornaments/dc8f6be5-9103-4122-bd4a-0d0fe1da3f41:upload_2025-12-09-15.42.02.png',
  },
  {
    ornamentId: 10,
    name: '캔디 스틱',
    imgUrl: 'https://treetory.s3.ap-northeast-2.amazonaws.com/members/b8a3eb59-b956-4df9-8a55-80784016b8d4/ornaments/dc8f6be5-9103-4122-bd4a-0d0fe1da3f41:upload_2025-12-09-15.42.02.png',
  },
  {
    ornamentId: 11,
    name: '캔디 스틱',
    imgUrl: 'https://treetory.s3.ap-northeast-2.amazonaws.com/members/b8a3eb59-b956-4df9-8a55-80784016b8d4/ornaments/dc8f6be5-9103-4122-bd4a-0d0fe1da3f41:upload_2025-12-09-15.42.02.png',
  },
  {
    ornamentId: 12,
    name: '캔디 스틱',
    imgUrl: 'https://treetory.s3.ap-northeast-2.amazonaws.com/members/b8a3eb59-b956-4df9-8a55-80784016b8d4/ornaments/dc8f6be5-9103-4122-bd4a-0d0fe1da3f41:upload_2025-12-09-15.42.02.png',
  },
  {
    ornamentId: 12,
    name: '캔디 스틱',
    imgUrl: 'https://treetory.s3.ap-northeast-2.amazonaws.com/members/b8a3eb59-b956-4df9-8a55-80784016b8d4/ornaments/dc8f6be5-9103-4122-bd4a-0d0fe1da3f41:upload_2025-12-09-15.42.02.png',
  },
];

const CATEGORIES = [
  { id: 'all', label: '전체', icon: '🎄' },
  { id: 'blue1', label: '분류', icon: '🦌' },
  { id: 'blue2', label: '분류', icon: '🦌' },
  { id: 'blue3', label: '분류', icon: '🦌' },
  { id: 'blue4', label: '분류', icon: '🦌' },
];

export default function DecoratePage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 6;

  // 검색어와 카테고리에 따라 장식 필터링
  const filteredOrnaments = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return MOCK_ORNAMENTS.filter((ornament) =>
      ornament.name.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // 페이지네이션 계산
  const totalPages = Math.max(1, Math.ceil(filteredOrnaments.length / pageSize));
  const paginatedOrnaments = useMemo(() => {
    const start = currentPage * pageSize;
    return filteredOrnaments.slice(start, start + pageSize);
  }, [filteredOrnaments, currentPage]);

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
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(0);
            }}
          />
        </div>
        <button className="rounded-lg bg-muted-navy px-4 py-3 font-semibold text-beige hover:opacity-90">
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
      <OrnamentGrid ornaments={paginatedOrnaments} />

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
