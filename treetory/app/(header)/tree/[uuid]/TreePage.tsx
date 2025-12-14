"use client";

import { useEffect, useState, useRef } from "react";
import { Group, Layer, Stage } from "react-konva";
import { Tree } from "@/components/ui/tree/Tree";
import { useOwner } from "@/app/(header)/tree/[uuid]/tree-context";
import { useRouter } from "next/navigation";
import { Ornarment } from "@/types/ornarment";
import { useBottomSheet } from "@/hooks/useBottomSheet";
import OrnamentBottomSheet from "@/components/ui/tree/OrnamentBottomSheet";
import { useThemeStore } from "@/store/userStore";
import Konva from "konva";

export default function TreePage() {
  const { owner, uuid } = useOwner();
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [treeHeight, setTreeHeight] = useState(0);
  const [treeWidth, setTreeWidth] = useState(0);
  const [treeSize, setTreeSize] = useState(3);

  // 로딩 확인
  const [isTreeReady, setIsTreeReady] = useState(false);

  // 배경 테마 확인
  const setTheme = useThemeStore((s) => s.setTheme);

  //선택된 장식 확인
  const [selectedOrnament, setSelectedOrnament] = useState<Ornarment | null>(
    null,
  );
  // 장식 조회 바텀 시트 상태 관리
  const { isOpen, open, close } = useBottomSheet();

  const router = useRouter();

  // 트리 사이즈 확인
  useEffect(() => {
    //  storeOwner가 아직 없으면 바로 저장
    if (!owner) {
      return;
    }

    setTreeSize(owner.treeSize ?? 3);
  }, [owner]);

  // 배경 테마 적용
  useEffect(() => {
    if (!owner.treeBackground) return;

    setTheme(owner.treeBackground);
  }, [owner.treeBackground, setTheme]);

  // 트리 규격에 따른 사이즈 확인
  useEffect(() => {
    function updateSize() {
      if (!containerRef.current) return;
      const { clientWidth, clientHeight } = containerRef.current;
      setSize({ width: clientWidth, height: clientHeight });
    }

    updateSize();
    const observer = new ResizeObserver(updateSize);
    const el = containerRef.current;
    if (el) observer.observe(el);

    window.addEventListener("resize", updateSize);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  // 선택된 장식 정보 상태 저장
  const handleSelectOrnament = (ornament: Ornarment) => {
    setSelectedOrnament(ornament);
    open(); // 바텀시트 열기
  };

  return (
    <div className={`relative mb-0 h-full w-full`} ref={containerRef}>
      <div
        style={{
          width: size.width,
          height: size.height,
          zIndex: 1,
        }}
        className="no-scrollbar overflow-y-scroll"
      >
        {!isTreeReady && (
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <span
              className={`text-body text-center ${owner.treeBackground === "SILENT_NIGHT" ? "text-beige" : "text-fg-primary"}`}
            >
              트리를 불러오는 중이에요
            </span>
          </div>
        )}
        <Stage
          width={size.width}
          height={treeHeight + 120}
          style={{
            width: "100dvw", // CSS로 반응형 확대/축소
            height: "auto",
          }}
        >
          <Layer>
            <Group
              draggable={true}
              onDragMove={(p) => {
                console.log(p);
              }}
            >
              <Tree
                containerWidth={size.width}
                containerHeight={size.height}
                scale={1.0}
                theme={owner.treeTheme}
                size={owner.treeSize}
                onLoad={({ width, height }) => {
                  setTreeWidth(width);
                  setTreeHeight(height);
                  setIsTreeReady(true);
                }}
                onSelectOrnament={handleSelectOrnament}
              />
            </Group>
          </Layer>
        </Stage>
      </div>
      <button
        className="bg-skyblue text-button text-navy absolute right-0 bottom-20 left-auto translate-x-0 cursor-pointer rounded-full border-4 border-white px-6 py-5 font-bold md:bottom-10"
        onClick={() => {
          router.push(`/tree/${uuid}/ornaments`);
        }}
      >
        장식하기
      </button>
      <OrnamentBottomSheet
        isOpen={isOpen}
        onClose={close}
        ornament={selectedOrnament}
      />
    </div>
  );
}
