"use client";

import { Group, Image as KonvaImage } from "react-konva";
import useImage from "use-image";

type TreeType = "default" | "add1" | "tree2";
interface Props {
  containerWidth: number;
  containerHeight: number;
  scale: number;
  offset: number;
  isEnd: boolean;
  theme: string;
  background: string;
  type: TreeType;
}

export function Tree({
  containerWidth,
  containerHeight,
  scale,
  isEnd,
  offset,
  theme,
  background,
  type,
}: Props) {
  const imgMap = {
    default: {
      normal: `/images/theme/tree/${theme}/default.png`,
      end: `/images/theme/tree/${theme}/default-e.png`,
    },
    add1: {
      normal: `/images/theme/tree/${theme}/add1.png`,
      end: `/images/theme/tree/${theme}/add1-e.png`,
    },
    tree2: {
      normal: `/images/theme/tree/${theme}/add2.png`,
      end: `/images/theme/tree/${theme}/add2-e.png`,
    },
  } as const;

  const imgSrc = isEnd ? imgMap[type].end : imgMap[type].normal;
  console.log(imgSrc, isEnd);

  const [treeImg] = useImage(imgSrc);
  if (!treeImg) return null;

  const treeW = treeImg.width * scale;
  const treeH = treeImg.height * scale;

  // 가로 중앙 정렬
  const x = (containerWidth - treeW) / 2;

  // 세로 중앙 정렬 기준점
  const centerY = 0;

  // 중앙 기준 + 아래로 쌓이기 위한 offset
  const y = centerY + offset;
  return (
    <Group x={x} y={y}>
      <KonvaImage image={treeImg} scale={{ x: scale, y: scale }} />
    </Group>
  );
}
