"use client";

import { useEffect, useState, useRef } from "react";
import { Layer } from "react-konva";
import { useOwner } from "@/app/(header)/tree/[uuid]/tree-context";
import { useRouter, useSearchParams } from "next/navigation";
import { Ornarment } from "@/types/ornarment";
import { useThemeStore } from "@/store/userStore";
import Konva from "konva";
import { useStageZoom } from "@/hooks/useStageZoom";
import StageLayout from "@/components/ui/tree/StageLayout";
import { PlacementTree } from "@/components/ui/tree/PlacementTree";
import { useAlert } from "@/hooks/useAlert";

export default function PlacementPage() {
  const searchParams = useSearchParams();
  const { owner, uuid, refreshOwner } = useOwner(); // 해당 트리 소유자 정보
  const alert = useAlert();

  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [treeHeight, setTreeHeight] = useState(0);
  const [treeWidth, setTreeWidth] = useState(0);

  const nickname = searchParams.get("nickname");
  const ornamentId = searchParams.get("ornamentId");
  const message = searchParams.get("text");
  const font = searchParams.get("font");

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
    return;
  };

  // 장식등록 요청 후 이동
  const enrollOrnament = async () => {
    if (!ornamentId || !placedPositions) return;
    const positionX = placedPositions[ornamentId]["x"];
    const positionY = placedPositions[ornamentId]["y"];

    try {
      const res = await fetch(`/api/trees/${uuid}/ornaments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          positionX: positionX,
          positionY: positionY,
          nickname: nickname,
          message: message,
          ornamentId: ornamentId,
          font: font,
        }),
        credentials: "include",
      });

      if (res.ok) {
        await refreshOwner();
        alert("장식 등록에 성공하셨습니다!");
        router.push(`/tree/${uuid}`);
        return;
      }
      if (res.status == 400) {
        await refreshOwner();
        alert("다른 장식과 너무 가깝거나 이미 등록된 장식이 있어요!");
        return;
      } else {
        console.log("장식 등록 실패", res);
        return;
      }
    } catch (error) {
      console.error("장식 등록 api 실패", error);
      return;
    }
  };

  return (
    <div className={`relative h-dvh w-full`} ref={containerRef}>
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
            // onWheel={handleWheel}
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
        className="bg-skyblue text-button text-navy fixed right-4 bottom-4 max-w-30 cursor-pointer rounded-full border-4 border-white px-6 py-5 font-bold md:bottom-4 md:left-1/2 md:ml-70 md:-translate-x-1/2"
        onClick={enrollOrnament}
      >
        장식완료
      </button>
    </div>
  );
}
