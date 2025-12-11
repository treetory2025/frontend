"use client";

import { off } from "process";
import { useEffect } from "react";
import { Group, Image as KonvaImage } from "react-konva";
import useImage from "use-image";

interface Props {
  containerWidth: number;
  containerHeight: number;
  scale: number;
  theme?: string;
  size?: number;
  onLoad?: (height: number) => void;
}

export function Tree({
  containerWidth,
  containerHeight,
  scale,
  theme,
  size,
  onLoad,
}: Props) {
  const imgSrc = `/images/theme/tree/${theme}/Size${size}.png`;
  const baseImgSrc = `/images/theme/tree/${theme}/Size7.png`;
  const [treeImg] = useImage(imgSrc);
  const [baseImg] = useImage(baseImgSrc);

  useEffect(() => {
    if (treeImg && onLoad) {
      onLoad(treeImg.height * scale);
    }
  }, [treeImg, scale]);

  if (!treeImg || !baseImg) return null;

  const treeW = treeImg.width * scale;
  let diff = 0;

  if (theme !== "SNOWY" || !size) {
    diff = 0;
  } else if (size === 8 || size === 10) {
    diff = 8;
  }
  // 가로 중앙 정렬
  const x = (containerWidth - treeW) / 2 - diff * scale;
  return (
    <Group
      x={x}
      y={
        containerHeight <= 455
          ? containerHeight * 0.05
          : containerWidth >= 540 && containerHeight <= 720
            ? containerHeight * 0.1
            : containerHeight * 0.2
      }
    >
      <KonvaImage image={treeImg} scale={{ x: scale, y: scale }} />
    </Group>
  );
}
