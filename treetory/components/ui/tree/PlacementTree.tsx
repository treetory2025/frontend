"use client";

import { useEffect, useRef, useState } from "react";
import { Group, Image as KonvaImage, Rect } from "react-konva";
import useImage from "use-image";
import Konva from "konva";

import Ornaments, { PlacementOrnament } from "./Ornaments";
import Background from "./Background";
import type { Ornarment } from "@/types/ornarment";
import { TestOrnament } from "@/app/(header)/tree/[uuid]/decorate/placement/PlacementPage";

interface Props {
  containerWidth: number;
  containerHeight: number;
  scale: number;
  theme?: string;
  background?: string;
  size?: number;
  onLoad?: (size: { width: number; height: number }) => void;
  onSelectOrnament: (ornament: Ornarment) => void;
  onPositionChange: (ornamentId: string, pos: { x: number; y: number }) => void;
}

export function PlacementTree({
  containerWidth,
  containerHeight,
  scale,
  theme,
  background,
  size,
  onLoad,
  onSelectOrnament,
  onPositionChange,
}: Props) {
  const [isDraggingOrnament, setIsDraggingOrnament] = useState(false);

  const defaultSrc = `/images/theme/tree/${theme}/Size3.png`;
  const imgSrc = `/images/theme/tree/${theme}/Size${size}.png`;

  const [defaultImg] = useImage(defaultSrc);
  const [treeImg] = useImage(imgSrc);

  const groupRef = useRef<Konva.Group | null>(null);

  useEffect(() => {
    if (treeImg && onLoad) {
      onLoad({
        width: treeImg.width * scale,
        height: treeImg.height * scale,
      });
    }
  }, [treeImg, scale, onLoad]);

  if (!treeImg || !defaultImg) return null;

  const treeW = treeImg.width * scale;
  const treeH = treeImg.height * scale;
  const defaultW = defaultImg.width * scale;

  // 트리 위치 계산
  let diff = 0;
  if (theme === "SNOWY" && (size === 8 || size === 10)) {
    diff = 8;
  }

  let y = 0;
  if (containerHeight <= 455) {
    y = containerHeight * 0.05;
  } else if (containerWidth >= 540 && containerHeight <= 720) {
    y = containerHeight * 0.1;
  } else {
    y = containerHeight * 0.2;
  }

  const x = (containerWidth - treeW) / 2 - diff * scale;
  const diffX = (treeW - defaultW) / 2 + diff * scale;

  // 트리 드래그 가능 여부
  const overflowX = Math.max(0, treeW - containerWidth);
  const overflowY = Math.max(0, treeH - containerHeight + y);
  const canDragTree = !isDraggingOrnament && (overflowX > 0 || overflowY > 0);

  const handleTreeDragMove = (e: any) => {
    if (isDraggingOrnament) return;

    const node = e.target;
    let nextX = node.x();
    let nextY = node.y();

    if (overflowX > 0) {
      const minX = 2 * x;
      const maxX = 0;
      nextX = Math.min(Math.max(nextX, minX), maxX);
    } else {
      nextX = x;
    }

    if (overflowY > 0) {
      const minY = y - overflowY;
      const maxY = y;
      nextY = Math.min(Math.max(nextY, minY), maxY);
    } else {
      nextY = y;
    }

    node.position({ x: nextX, y: nextY });
  };

  return (
    <Group
      ref={groupRef}
      x={x}
      y={y}
      draggable={canDragTree}
      onDragMove={handleTreeDragMove}
    >
      {/* 배경 */}
      <Rect
        x={-treeW * 0.3}
        y={-25}
        width={treeW * 1.6}
        height={size && size < 5 ? treeH + 75 : treeH + 55}
        fill={
          background === "SNOWY_HILL"
            ? "#C6E9F5"
            : background === "SILENT_NIGHT"
              ? "#17395C"
              : "transparent"
        }
      />
      {background && (
        <Background
          x={x}
          y={y}
          containerWidth={containerWidth}
          containerHeight={containerHeight}
          treeWitdh={treeW}
          treeHeight={treeH}
          size={size}
          scale={1}
          theme={background}
        />
      )}
      <KonvaImage image={treeImg} scale={{ x: scale, y: scale }} />
      {/* 기존 장식 */}
      <Ornaments diffX={diffX} onSelectOrnament={onSelectOrnament} />
      {/* 등록할 장식 */}
      {/* <PlacementOrnament
        ornament={testOrnament}
        diffX={diffX}
        treeGroupRef={groupRef}
        onPositionChange={(pos) => onPositionChange(testOrnament.id, pos)}
      /> */}
      {/* 테스트용 장식 */}
      <TestOrnament diffX={diffX} onDragStateChange={setIsDraggingOrnament} />
    </Group>
  );
}
