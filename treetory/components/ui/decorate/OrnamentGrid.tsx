interface Ornament {
  ornamentId: number;
  name: string;
  imgUrl: string;
}

interface OrnamentGridProps {
  ornaments: Ornament[];
}

export default function OrnamentGrid({ ornaments }: OrnamentGridProps) {
  return (
    <div className="grid grid-cols-3 gap-4 md:gap-6">
      {ornaments.length > 0 ? (
        ornaments.map((ornament) => (
          <button
            key={ornament.ornamentId}
            className="group flex flex-col gap-2 rounded-lg p-2 transition-all duration-200 hover:scale-105 md:p-3"
          >
            {/* 이미지 카드 */}
            <div className="relative w-full overflow-hidden rounded-lg bg-beige aspect-square">
              <img
                src={ornament.imgUrl}
                alt={ornament.name}
                className="h-full w-full object-cover"
              />
              {/* 호버 오버레이 */}
              <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-200 group-hover:opacity-10" />
            </div>
            {/* 이름 */}
            <div className="truncate text-xs md:text-sm text-fg-primary font-semibold">
              {ornament.name}
            </div>
          </button>
        ))
      ) : (
        <div className="col-span-3 py-12 text-center">
          <p className="text-body text-fg-secondary">
            검색 결과가 없습니다.
          </p>
        </div>
      )}
    </div>
  );
}
