import React from "react";

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
    <div className="grid min-h-[28rem] grid-cols-3 gap-4 md:min-h-[32rem] md:gap-6">
      {ornaments.length > 0 ? (
        // show only first 12 items (3 per row × 4 rows)
        ornaments.slice(0, 12).map((ornament) => (
          <button
            key={ornament.ornamentId}
            onClick={() => onSelect?.(ornament.ornamentId)}
            className="group flex flex-col items-center gap-2 rounded-lg p-2 transition-all duration-200 hover:scale-105 md:p-3"
            type="button"
          >
            {/* 이미지 카드 */}
            <div className="bg-beige relative flex items-center justify-center rounded-full">
              <div className="h-28 w-28 overflow-hidden rounded-full md:h-28 md:w-28">
                <img
                  src={ornament.imgUrl}
                  alt={ornament.name}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                  crossOrigin="anonymous"
                />
              </div>
              {/* 호버 오버레이 */}
              <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-200 group-hover:opacity-10" />
            </div>
            {/* 이름 */}
            <div className="text-fg-primary max-w-[6rem] truncate text-center text-xs font-semibold md:text-sm">
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
