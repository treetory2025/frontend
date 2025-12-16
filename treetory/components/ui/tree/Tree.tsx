"use client";

import { useEffect, useRef } from "react";
import { Group, Image as KonvaImage, Rect } from "react-konva";
import useImage from "use-image";
import Ornaments from "./Ornaments";
import type { Ornarment } from "@/types/ornarment";
import Background from "./Background";
import Konva from "konva";
import { useCaptureStore } from "@/store/useCaptureStore";
import { exportTreeImage } from "@/lib/capture";

interface Props {
  containerWidth: number;
  containerHeight: number;
  scale: number;
  theme?: string;
  background?: string;
  size?: number;
  onLoad?: (size: { width: number; height: number }) => void;
  onSelectOrnament: (ornament: Ornarment) => void;
}

export function Tree({
  containerWidth,
  containerHeight,
  scale,
  theme,
  background,
  size,
  onLoad,
  onSelectOrnament,
}: Props) {
  const defaultSrc = `/images/theme/tree/${theme}/Size3.png`;
  const imgSrc = `/images/theme/tree/${theme}/Size${size}.png`;

  const [defaultImg] = useImage(defaultSrc);
  const [treeImg] = useImage(imgSrc);

  const groupRef = useRef<Konva.Group | null>(null);

  // 캡쳐 전역 상태 불러오기
  const registerCapture = useCaptureStore((s) => s.registerCapture);
  const clearCapture = useCaptureStore((s) => s.clear);
  const captureTreeGroup = () => {
    if (!groupRef.current) return;

    const stage = groupRef.current.getStage();
    if (!stage) return;

    const rect = groupRef.current.getClientRect({
      relativeTo: stage,
    });

    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

    const dataURL = stage.toDataURL({
      x: rect.x,
      y: rect.y,
      width: rect.width,
      height: rect.height,
      pixelRatio: isIOS ? 1 : 2,
    });

    exportTreeImage(dataURL);
  };

  useEffect(() => {
    registerCapture(captureTreeGroup);

    return () => {
      clearCapture();
    };
  }, []);

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

  // 트리 이미지 위치 보정값
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

  // 드래그 범위 제한
  const overflowX = Math.max(0, treeW - containerWidth);
  const canDragX = overflowX > 0;
  console.log(canDragX);
  const overflowY = Math.max(0, treeH - containerHeight + y);
  const canDragY = overflowY > 0;

  const handleDragMove = (e: any) => {
    const node = e.target;

    let nextX = node.x();
    let nextY = node.y();

    if (!canDragX) {
      console.log(x);
      nextX = x;
    } else {
      console.log("moving");
      const minX = 2 * x;
      const maxX = 0;
      nextX = Math.min(Math.max(nextX, minX), maxX);
    }

    if (canDragY) {
      const minY = y - overflowY;
      const maxY = y;
      nextY = Math.min(Math.max(nextY, minY), maxY);
    } else {
      nextY = y;
    }

    node.position({ x: nextX, y: nextY });
  };

  console.log(y, treeH);

  return (
    <Group
      ref={groupRef}
      x={x}
      y={y}
      draggable={canDragX || canDragY}
      onDragMove={handleDragMove}
    >
      {/* 배경 추가 */}
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
      {background === "SNOWY_HILL" && (
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
      {background === "SILENT_NIGHT" && (
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
      <Ornaments onSelectOrnament={onSelectOrnament} diffX={diffX} />
    </Group>
  );
}
