"use client";

import { useEffect } from "react";
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
  onLoad?: (height: number) => void;
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
  const baseImgSrc = `/images/theme/tree/${theme}/Size7.png`;

  const [defaultImg] = useImage(defaultSrc);
  const [treeImg] = useImage(imgSrc);
  const [baseImg] = useImage(baseImgSrc);

  useEffect(() => {
    if (treeImg && onLoad) {
      onLoad(treeImg.height * scale);
    }
  }, [treeImg, scale]);

  if (!treeImg || !baseImg || !defaultImg) return null;

  const defaultW = defaultImg.width * scale;

  const treeW = treeImg.width * scale;
  let diff = 0;

  if (theme !== "SNOWY" || !size) {
    diff = 0;
  } else if (size === 8 || size === 10) {
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

  // 가로 중앙 정렬
  const x = (containerWidth - treeW) / 2 - diff * scale;
  const diffX = (treeW - defaultW) / 2 + diff * scale;
  return (
    <Group x={x} y={y}>
      <KonvaImage image={treeImg} scale={{ x: scale, y: scale }} />
      <Ornaments onSelectOrnament={onSelectOrnament} diffX={diffX} />
    </Group>
  );
}
