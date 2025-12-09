"use client";

import { Group, Image as KonvaImage } from "react-konva";
import useImage from "use-image";

interface Props {
  containerWidth: number;
  containerHeight: number;
  scale: number;
  offsetY: number;
  type: "default" | "tree1" | "tree2";
}

export function Tree({
  containerWidth,
  containerHeight,
  scale,
  offsetY,
  type,
}: Props) {
  const imgSrc =
    type === "default"
      ? "/images/main/snow-tree-default.png"
      : type === "tree1"
        ? "/images/main/snow-tree-1.png"
        : "/images/main/snow-tree-2.png";

  const [treeImg] = useImage(imgSrc);
  if (!treeImg) return null;

  const treeW = treeImg.width * scale;
  const treeH = treeImg.height * scale;

  // 가로 중앙 정렬
  const x = (containerWidth - treeW) / 2;

  // 세로 중앙 정렬 기준점
  const centerY = containerHeight / 2 - treeH / 2;

  // 중앙 기준 + 아래로 쌓이기 위한 offset
  const y = centerY + offsetY;

  return (
    <Group x={x} y={y}>
      <KonvaImage image={treeImg} scale={{ x: scale, y: scale }} />
    </Group>
  );
}
