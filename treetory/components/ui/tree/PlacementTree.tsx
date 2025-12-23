"use client";

import { useEffect, useRef, useState } from "react";
import { Group, Image as KonvaImage } from "react-konva";
import useImage from "use-image";
import Konva from "konva";

import Ornaments, { PlacementOrnament } from "./Ornaments";
import Background from "./Background";
import type { Ornarment } from "@/types/ornarment";
import { useSearchParams } from "next/navigation";

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
  const searchParams = useSearchParams();

  const imgUrl = searchParams.get("imgUrl");
  const ornamentId = searchParams.get("ornamentId");
  const ornamentSize = searchParams.get("size");

  const defaultSrc = `/images/theme/tree/${theme}/Size3.png`;
  const imgSrc = `/images/theme/tree/${theme}/Size${size}.png`;

  const [defaultImg] = useImage(defaultSrc);
  const [treeImg] = useImage(imgSrc);

  const groupRef = useRef<Konva.Group | null>(null);

  /** 🔑 Tree와 동일한 드래그 기준점 */
  const initialPosRef = useRef({ x: 0, y: 0 });

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

  let diff = 0;
  if (theme === "SNOWY" && (size === 8 || size === 10)) {
    diff = 8;
  }

  let y = 0;
  if (containerHeight <= 455) {
    y = containerHeight * 0.3;
  } else if (containerWidth >= 540 && containerHeight <= 720) {
    y = containerHeight * 0.1;
  } else {
    y = containerHeight * 0.2;
  }

  const TOP_PADDING_PX = 40;
  const EXTRA_UP = Math.min(120, containerHeight * 0.15);
  y = Math.max(TOP_PADDING_PX, y);

  const x = (containerWidth - treeW) / 2 - diff * scale;
  const diffX = (treeW - defaultW) / 2 + diff * scale;

  const visualTreeHeight = size && size < 5 ? treeH + 75 : treeH + 55;
  const BOTTOM_PADDING = 100;

  const overflowX = Math.max(0, treeW - containerWidth);
  const overflowY = Math.max(
    0,
    visualTreeHeight + y - containerHeight + BOTTOM_PADDING,
  );

  const canDragTree = !isDraggingOrnament && (overflowX > 0 || overflowY > 0);

  const handleTreeDragMove = (e: any) => {
    if (isDraggingOrnament) return;

    const node = e.target;
    const { x: baseX, y: baseY } = initialPosRef.current;

    let nextX = node.x();
    let nextY = node.y();

    if (overflowX > 0) {
      const minX = 2 * baseX;
      const maxX = 0;
      nextX = Math.min(Math.max(nextX, minX), maxX);
    } else {
      nextX = baseX;
    }

    if (overflowY > 0) {
      const minY = baseY - overflowY - EXTRA_UP;
      const maxY = baseY;
      nextY = Math.min(Math.max(nextY, minY), maxY);
    } else {
      nextY = baseY;
    }

    node.position({ x: nextX, y: nextY });
  };

  return (
    <Group
      ref={groupRef}
      x={x}
      y={y}
      draggable={canDragTree}
      onDragStart={() => {
        initialPosRef.current = { x, y };
      }}
      onDragMove={handleTreeDragMove}
    >
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

      {/* 배치 중인 장식 */}
      <PlacementOrnament
        initialPos={{
          x: treeW / 2 - diffX,
          y: visualTreeHeight / 2,
        }}
        imgUrl={imgUrl ?? ""}
        ornamentSize={ornamentSize ?? "SMALL"}
        diffX={diffX}
        onDragStateChange={setIsDraggingOrnament}
        onPositionChange={(pos) => onPositionChange(ornamentId ?? "", pos)}
        containerWidth={containerWidth}
        treeRect={{ width: treeW, height: treeH }}
      />
    </Group>
  );
}
