import theme1 from "@/public/images/theme1.png";
import theme2 from "@/public/images/theme2.png";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function BackgroundContainer({
  onSubmit,
}: {
  onSubmit: (value: string) => void;
}) {
  const themes = [
    { id: 0, name: "고요한 밤", image: theme1 },
    { id: 1, name: "눈 내리는 언덕", image: theme2 },
  ];

  // 좌우 이동을 위한 index (회원 정보 반영 x)
  const [index, setIndex] = useState(0);

  // 현재 설정된 테마 (회원 정보 반영 x)
  const [currentTheme, setCurrentTheme] = useState("고요한 밤");
  const selectedTheme = themes.find((t) => t.name === currentTheme);

  if (!selectedTheme) return null; // 또는 로딩

  // 선택한 테마가 가장 첫번째로 오도록 설정
  const sortedThemes = [
    selectedTheme,
    ...themes.filter((t) => t.name !== currentTheme),
  ];

  const canPrev = index > 0;
  const canNext = index < sortedThemes.length - 1;

  // 현재 화면에 보여줄 theme
  const shownTheme = themes[index];

  return (
    <div className="flex flex-col items-center gap-0 py-4">
      <div className="flex items-center justify-center gap-4">
        {/* 왼쪽 버튼 */}
        <button
          onClick={() => canPrev && setIndex(index - 1)}
          disabled={!canPrev}
          className={`bg-muted-navy flex size-11 items-center justify-center rounded-full border-3 border-white pr-0.5 ${canPrev ? "" : "cursor-default opacity-20"}`}
        >
          <ChevronLeft size={28} />
        </button>

        {/* 이미지 */}
        <div
          className={`box-content h-[327px] w-[200px] overflow-hidden rounded-xl border-[5px] ${selectedTheme.name === shownTheme.name ? "border-green" : "border-white"}`}
        >
          <Image
            src={shownTheme.image}
            className="h-full w-full"
            alt={shownTheme.name}
          />
        </div>

        {/* 오른쪽 버튼 */}
        <button
          onClick={() => canNext && setIndex(index + 1)}
          disabled={!canNext}
          className={`bg-muted-navy flex size-11 items-center justify-center rounded-full border-3 border-white pl-0.5 ${canNext ? "" : "cursor-default opacity-20"}`}
        >
          <ChevronRight size={28} />
        </button>
      </div>

      {/* 선택된 테마가 항상 첫 번째 출력 */}
      <p className="text-navy font-memoment text-heading my-2 text-center">
        {shownTheme.name}
      </p>

      {/* 선택 버튼 */}
      <button
        className="bg-green text-button text-beige mt-4 h-12 w-[60%] rounded-md"
        onClick={() => {
          setCurrentTheme(shownTheme.name);
          onSubmit(shownTheme.name);
        }}
      >
        선택
      </button>
    </div>
  );
}
