"use client";

import { useEffect, useState, useRef } from "react";
import { Layer, Group, Image as KonvaImage, Text } from "react-konva";
import { Tree } from "@/components/ui/tree/Tree";
import { useOwner } from "@/app/(header)/tree/[uuid]/tree-context";
import { useRouter } from "next/navigation";
import { Ornarment } from "@/types/ornarment";
import { useThemeStore } from "@/store/userStore";
import Konva from "konva";
import { useStageZoom } from "@/hooks/useStageZoom";
import StageLayout from "@/components/ui/tree/StageLayout";
import useImage from "use-image";
import { PlacementTree } from "@/components/ui/tree/PlacementTree";

export default function PlacementPage() {
  const { owner, uuid } = useOwner(); // 해당 트리 소유자 정보

  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [treeHeight, setTreeHeight] = useState(0);
  const [treeWidth, setTreeWidth] = useState(0);

  // 등록할 장식 좌표
  const [placedPositions, setPlacedPositions] = useState<
    Record<string, { x: number; y: number }>
  >({});

  const stageRef = useRef<Konva.Stage | null>(null);

  const { handleWheel, handleTouchMove, handleTouchEnd } = useStageZoom(
    stageRef,
    {
      minScale: 1,
      maxScale: 1.6,
      scaleBy: 1.01,
    },
  );
  // 로딩 확인
  const [isTreeReady, setIsTreeReady] = useState(false);

  // 배경 테마 확인
  const setTheme = useThemeStore((s) => s.setTheme);

  const router = useRouter();

  // 휠 클릭 이벤트 방지
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const preventWheelClick = (e: MouseEvent) => {
      if (e.button === 1) {
        e.preventDefault();
      }
    };

    el.addEventListener("mousedown", preventWheelClick);
    el.addEventListener("auxclick", preventWheelClick);

    return () => {
      el.removeEventListener("mousedown", preventWheelClick);
      el.removeEventListener("auxclick", preventWheelClick);
    };
  });

  // 배경 테마 적용
  useEffect(() => {
    if (!owner.treeBackground) return;

    setTheme(owner.treeBackground);
  }, [owner.treeBackground, setTheme]);

  // stage 규격 확인
  useEffect(() => {
    function updateSize() {
      if (!containerRef.current) return;
      console.log(containerRef);
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
  const handleSelectOrnament = (ornament: Ornarment) => {};
  const overflowX = Math.max(0, treeWidth - size.width);
  const canDragX = overflowX > 0;

  return (
    <div className={`relative h-full w-full`} ref={containerRef}>
      <div
        style={{
          width: size.width,
          height: size.height,
          zIndex: 1,
        }}
        className="no-scrollbar overflow-hidden"
      >
        {!isTreeReady && (
          <div className="absolute inset-0 z-10 flex h-full items-center justify-center">
            <span
              className={`text-body text-center ${owner.treeBackground === "SILENT_NIGHT" ? "text-beige" : "text-fg-primary"}`}
            >
              트리를 불러오는 중이에요
            </span>
          </div>
        )}

        <StageLayout
          stageRef={stageRef}
          draggable={false}
          width={size.width}
          height={Math.max(size.height + 120, treeHeight + 120)}
        >
          <Layer
            onWheel={handleWheel}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <PlacementTree
              containerWidth={size.width}
              containerHeight={size.height}
              scale={1}
              theme={owner.treeTheme}
              background={owner.treeBackground}
              size={owner.treeSize}
              onLoad={({ width, height }) => {
                setTreeWidth(width);
                setTreeHeight(height);
                setIsTreeReady(true);
              }}
              onSelectOrnament={handleSelectOrnament}
              onPositionChange={(ornamentId, pos) => {
                setPlacedPositions((prev) => ({
                  ...prev,
                  [ornamentId]: pos,
                }));
              }}
            />
          </Layer>
        </StageLayout>
      </div>
      <button
        className="bg-skyblue text-button text-navy absolute right-4 bottom-20 left-auto translate-x-0 cursor-pointer rounded-full border-4 border-white px-6 py-5 font-bold md:bottom-10"
        onClick={() => {}}
      >
        장식완료
      </button>
    </div>
  );
}

export function TestOrnament({
  diffX,
  onDragStateChange,
}: {
  diffX: number;
  onDragStateChange: (dragging: boolean) => void;
}) {
  const [image] = useImage("/icons/santa.png", "anonymous"); // public에 테스트 이미지 하나
  const [pos, setPos] = useState({ x: 400, y: 400 });
  const radius = 30;

  return (
    <Group
      x={pos.x + diffX}
      y={pos.y}
      draggable
      onDragStart={() => onDragStateChange(true)}
      onDragEnd={() => onDragStateChange(false)}
    >
      <KonvaImage
        image={image}
        width={radius * 2}
        height={radius * 2}
        offsetX={radius}
        offsetY={radius}
      />
    </Group>
  );
}
