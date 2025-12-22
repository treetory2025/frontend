"use client";
import { Group, Image as KonvaImage } from "react-konva";
import useImage from "use-image";

interface Props {
  x: number;
  y: number;
  containerWidth: number;
  containerHeight: number;
  treeWitdh: number;
  treeHeight: number;
  scale: number;
  theme?: string;
  size?: number;
}
export default function Background({
  containerWidth,
  containerHeight,
  x,
  y,
  treeWitdh,
  treeHeight,
  scale,
  theme,
  size,
}: Props) {
  const imgSrc = `/images/theme/background/${theme}/bottom.png`;
  const [backgroundImg] = useImage(imgSrc);

  if (!backgroundImg) return null;
  const backgroundW = Math.max(treeWitdh, backgroundImg.width * scale);
  const backgroundH = backgroundImg.height * scale;

  const scaleX = 1.5;
  const bx =
    size && size >= 5
      ? (containerWidth - backgroundW * scaleX) / 2 - x
      : (containerWidth - treeWitdh * scaleX) / 2 - x;
  const dy = size && size >= 5 ? 30 : 50;
  return (
    <Group x={bx} y={treeHeight - backgroundH + dy}>
      <KonvaImage
        image={backgroundImg}
        width={treeWitdh}
        scale={{ x: scaleX, y: scale }}
      />
    </Group>
  );
}
