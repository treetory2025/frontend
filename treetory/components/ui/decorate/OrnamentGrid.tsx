import React from 'react';

interface Ornament {
  ornamentId: number;
  name: string;
  imgUrl: string;
}

interface OrnamentGridProps {
  ornaments: Ornament[];
  onSelect?: (ornamentId: number) => void;
}

function OrnamentGrid({ ornaments, onSelect }: OrnamentGridProps) {
  return (
    <div className="grid grid-cols-3 gap-4 md:gap-6">
      {ornaments.length > 0 ? (
        // show only first 6 items (3 per row × 2 rows)
        ornaments.slice(0, 6).map((ornament) => (
          <button
            key={ornament.ornamentId}
            onClick={() => onSelect?.(ornament.ornamentId)}
            className="group flex flex-col gap-2 items-center rounded-lg p-2 transition-all duration-200 hover:scale-105 md:p-3"
            type="button"
          >
            {/* 이미지 카드 */}
            <div className="relative flex items-center justify-center rounded-full bg-beige">
              <div className="w-28 h-28 md:w-28 md:h-28 overflow-hidden rounded-full">
                <img
                  src={ornament.imgUrl}
                  alt={ornament.name}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </div>
              {/* 호버 오버레이 */}
              <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-200 group-hover:opacity-10" />
            </div>
            {/* 이름 */}
            <div className="truncate text-xs md:text-sm text-fg-primary font-semibold text-center max-w-[6rem]">
              {ornament.name}
            </div>
          </button>
        ))
      ) : (
        <div className="col-span-3 py-12 text-center">
          <p className="text-body text-fg-secondary">검색 결과가 없습니다.</p>
        </div>
      )}
    </div>
  );
}

export default React.memo(OrnamentGrid);
