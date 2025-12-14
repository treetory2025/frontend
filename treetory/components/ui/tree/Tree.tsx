"use client";

import { useEffect, useRef } from "react";
import { Group, Image as KonvaImage } from "react-konva";
import useImage from "use-image";
import Ornaments from "./Ornaments";
import type { Ornarment } from "@/types/ornarment";

interface Props {
  containerWidth: number;
  containerHeight: number;
  scale: number;
  theme?: string;
  size?: number;
  onLoad?: (size: { width: number; height: number }) => void;
  onSelectOrnament: (ornament: Ornarment) => void;
}

export function Tree({
  containerWidth,
  containerHeight,
  scale,
  theme,
  size,
  onLoad,
  onSelectOrnament,
}: Props) {
  const defaultSrc = `/images/theme/tree/${theme}/Size3.png`;
  const imgSrc = `/images/theme/tree/${theme}/Size${size}.png`;

  const [defaultImg] = useImage(defaultSrc);
  const [treeImg] = useImage(imgSrc);

  const groupRef = useRef<any>(null);

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
    y = containerHeight * 0.05;
  } else if (containerWidth >= 540 && containerHeight <= 720) {
    y = containerHeight * 0.1;
  } else {
    y = containerHeight * 0.2;
  }

  const x = (containerWidth - treeW) / 2 - diff * scale;

  const diffX = (treeW - defaultW) / 2 + diff * scale;
  const canDrag = diffX > 0;

  const handleDragMove = (e: any) => {
    if (!canDrag) return;

    const node = e.target;

    const currentX = node.x();
    const currentY = node.y();

    // X축 이동 가능 범위
    const minX = 2 * x;
    const maxX = 0;

    // Y축 이동 가능 범위
    const overflowY = Math.max(0, treeH - containerHeight);
    const minY = y - overflowY;
    const maxY = y;

    const clampedX = Math.min(Math.max(currentX, minX), maxX);
    const clampedY = Math.min(Math.max(currentY, minY), maxY);

    if (clampedX !== currentX || clampedY !== currentY) {
      node.position({
        x: clampedX,
        y: clampedY,
      });
    }
  };

  return (
    <Group
      ref={groupRef}
      x={x}
      y={y}
      draggable={canDrag}
      onDragMove={handleDragMove}
    >
      <KonvaImage image={treeImg} scale={{ x: scale, y: scale }} />
      <Ornaments onSelectOrnament={onSelectOrnament} diffX={diffX} />
    </Group>
  );
}
