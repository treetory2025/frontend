"use client";

import { Image as KonvaImage } from "react-konva";
import useImage from "use-image";

interface TreeLayerProps {
  containerWidth: number;
  containerHeight: number;
  scale: number;
  theme?: string;
  stageOffsetY: number;
}

export function BottomLayer({
  containerWidth,
  containerHeight,
  scale,
  theme,
  stageOffsetY,
}: TreeLayerProps) {
  const [bottomImage] = useImage(
    `/images/theme/background/${theme}/bottom.png`,
  );

  if (!bottomImage) return null;

  const scaledW = bottomImage.width * scale;
  const scaledH = bottomImage.height * scale;

  // 가운데 정렬
  const x = (containerWidth - scaledW) / 2;

  // 화면의 절대 하단 정렬

  const y = stageOffsetY + (containerHeight - scaledH);

  return (
    <>
      <KonvaImage
        image={bottomImage}
        scale={{ x: scale, y: scale }}
        x={x}
        y={y}
      />
    </>
  );
}
