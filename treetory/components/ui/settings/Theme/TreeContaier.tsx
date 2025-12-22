import tree1 from "@/public/images/tree1.png";
import tree2 from "@/public/images/tree2.png";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { TREE_OPTIONS } from "@/types/theme";

type TreeValue = (typeof TREE_OPTIONS)[number]["value"];
interface Props {
  currentTree: TreeValue;
  onSubmit: (value: TreeValue) => void;
}

const IMAGE_MAP: Record<TreeValue, any> = {
  SNOWY: tree1,
  NORMAL: tree2,
};

export default function TreeContainer({ onSubmit, currentTree }: Props) {
  const themes = TREE_OPTIONS;

  const initialIndex = themes.findIndex((t) => t.value === currentTree);
  const [index, setIndex] = useState(initialIndex === -1 ? 0 : initialIndex);

  const shownTheme = themes[index];
  const isSelected = currentTree === shownTheme.value;

  const canPrev = index > 0;
  const canNext = index < themes.length - 1;

  // 현재 화면에 보여줄 theme

  return (
    <div className="flex flex-col items-center py-4">
      <div className="flex items-center justify-center gap-2">
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
          className={`box-content h-[294px] w-[229px] overflow-hidden rounded-xl border-[5px] ${shownTheme.value === currentTree ? "border-green" : "border-white"}`}
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
        className={`bg-green text-button text-beige mt-4 h-12 w-[60%] rounded-md ${isSelected ? "cursor-not-allowed opacity-40" : "cursor-pointer"}`}
        disabled={isSelected}
        onClick={() => {
          onSubmit(shownTheme.value);
        }}
      >
        선택
      </button>
    </div>
  );
}
