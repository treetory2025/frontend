"use client";

import { Group, Image as KonvaImage } from "react-konva";
import useImage from "use-image";

interface TreeLayerProps {
  containerWidth: number;
  containerHeight: number;
}

// 기본트리
export function DefaultTree({
  containerWidth,
  containerHeight,
}: TreeLayerProps) {
  const [treeImg] = useImage("/images/main/snow-tree-defualt.png");
  const [stumpImg] = useImage("/images/main/stump.png");

  if (!treeImg || !stumpImg) return null;

  const widthRatio = containerHeight <= 720 ? 0.65 : 0.9;

  const targetWidth = containerWidth * widthRatio;
  const scale = targetWidth / treeImg.width;

  const overlap = 20;

  const treeW = treeImg.width * scale;
  const treeH = treeImg.height * scale;

  const stumpW = stumpImg.width * scale;
  const stumpH = stumpImg.height * scale;

  // ⬇ Group 전체 높이
  const totalHeight = treeH + stumpH;

  const x = (containerWidth - treeW) / 2;
  const y = containerHeight - totalHeight + overlap;

  return (
    <Group x={x} y={y}>
      <KonvaImage
        image={stumpImg}
        scale={{ x: scale, y: scale }}
        x={(treeW - stumpW) / 2}
        y={treeH}
        offsetY={26}
      />
      <KonvaImage image={treeImg} scale={{ x: scale, y: scale }} />
    </Group>
  );
}

export function BottomLayer({
  containerWidth,
  containerHeight,
}: TreeLayerProps) {
  const [bottomImage] = useImage("/images/main/snow-bottom.png");

  if (!bottomImage) return null;

  const targetWidth = containerWidth;

  const scale = targetWidth / bottomImage.width;

  const bottomH =
    containerHeight <= 720
      ? bottomImage.height * scale * 0.6
      : bottomImage.height * scale;

  return (
    <KonvaImage
      image={bottomImage}
      scale={{ x: scale, y: scale }}
      x={0}
      y={containerHeight - bottomH}
    />
  );
}
