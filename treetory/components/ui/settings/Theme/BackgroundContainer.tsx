import theme1 from "@/public/images/theme1.png";
import theme2 from "@/public/images/theme2.png";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { BACKGROUND_OPTIONS } from "@/types/theme";

type BackgroundValue = (typeof BACKGROUND_OPTIONS)[number]["value"];

interface Props {
  currentBackground: BackgroundValue;
  onSubmit: (value: BackgroundValue) => void;
}

const IMAGE_MAP: Record<BackgroundValue, any> = {
  SILENT_NIGHT: theme1,
  SNOWY_HILL: theme2,
};

export default function BackgroundContainer({
  onSubmit,
  currentBackground,
}: Props) {
  const themes = BACKGROUND_OPTIONS;

  const initialIndex = themes.findIndex((t) => t.value === currentBackground);
  const [index, setIndex] = useState(initialIndex === -1 ? 0 : initialIndex);

  const shownTheme = themes[index];

  // 선택한 테마가 가장 첫번째로 오도록 설정
  const canPrev = index > 0;
  const canNext = index < themes.length - 1;

  return (
    <div className="flex flex-col items-center py-4">
      <div className="flex items-center justify-center gap-4">
        {/* 왼쪽 버튼 */}
        <button
          onClick={() => canPrev && setIndex(index - 1)}
          disabled={!canPrev}
          className={`bg-muted-navy flex size-11 items-center justify-center rounded-full border-3 border-white pr-0.5 ${canPrev ? "cursor-pointer" : "cursor-default opacity-20"}`}
        >
          <ChevronLeft size={28} />
        </button>

        {/* 이미지 */}
        <div
          className={`box-content h-[327px] w-[200px] overflow-hidden rounded-xl border-[5px] select-none ${shownTheme.value === currentBackground ? "border-green" : "border-white"}`}
        >
          <Image
            src={IMAGE_MAP[shownTheme.value]}
            className="h-full w-full"
            alt={shownTheme.label}
          />
        </div>

        {/* 오른쪽 버튼 */}
        <button
          onClick={() => canNext && setIndex(index + 1)}
          disabled={!canNext}
          className={`bg-muted-navy flex size-11 items-center justify-center rounded-full border-3 border-white pl-0.5 ${canNext ? "cursor-pointer" : "cursor-default opacity-20"}`}
        >
          <ChevronRight size={28} />
        </button>
      </div>

      {/* 선택된 테마가 항상 첫 번째 출력 */}
      <p className="text-navy font-memoment text-heading my-2 text-center">
        {shownTheme.label}
      </p>

      {/* 선택 버튼 */}
      <button
        className="bg-green text-button text-beige mt-4 h-12 w-[60%] cursor-pointer rounded-md"
        onClick={() => {
          onSubmit(shownTheme.value);
        }}
      >
        선택
      </button>
    </div>
  );
}
