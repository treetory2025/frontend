// "use client";

import { Group, Image as KonvaImage, Circle } from "react-konva";
import { useOwner } from "@/app/(header)/tree/[uuid]/tree-context";
import type { Ornarment } from "@/types/ornarment";
import useImage from "use-image";
import { useEffect, useState } from "react";

export default function Ornaments({
  onSelectOrnament,
  diffX,
}: {
  onSelectOrnament: (ornament: Ornarment) => void;
  diffX: number;
}) {
  const { owner } = useOwner();
  const ornaments = owner.ornamentsRes as Ornarment[];
  if (!ornaments || ornaments.length === 0) return null;

  return (
    <>
      {ornaments.map((ornament) => (
        <OrnamentItem
          key={ornament.placedOrnamentId}
          ornament={ornament}
          onSelectOrnament={onSelectOrnament}
          diffX={diffX}
        />
      ))}
    </>
  );
}

export function OrnamentItem({
  ornament,
  onSelectOrnament,
  diffX,
}: {
  ornament: Ornarment;
  onSelectOrnament: (ornament: Ornarment) => void;
  diffX: number;
}) {
  const [imgSrc] = useImage(ornament.imgUrl, "anonymous");

  const radius =
    ornament.size === "SMALL" ? 22 : ornament.size === "MEDIUM" ? 30 : 38;

  const handleMouseOver = (e: any) => {
    e.target.getStage().container().style.cursor = "pointer";
  };

  const handleMouseOut = (e: any) => {
    e.target.getStage().container().style.cursor = "default";
  };

  return (
    <Group
      x={ornament.positionX + diffX}
      y={ornament.positionY}
      clipFunc={(ctx) => {
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
      }}
      draggable={false}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onClick={() => onSelectOrnament(ornament)}
      onTap={() => onSelectOrnament(ornament)}
    >
      <KonvaImage
        image={imgSrc}
        width={radius * 2}
        height={radius * 2}
        offsetX={radius}
        offsetY={radius}
      />
    </Group>
  );
}

// 등록할 장식
export function PlacementOrnament({
  initialPos,
  imgUrl,
  ornamentSize,
  onDragStateChange,
  diffX,
  onPositionChange,
  containerWidth,
  treeRect,
}: {
  initialPos: { x: number; y: number };
  imgUrl?: string;
  ornamentSize?: string;
  onDragStateChange: (dragging: boolean) => void;
  onPositionChange: (pos: { x: number; y: number }) => void;
  diffX: number;
  containerWidth: number;
  treeRect: { width: number; height: number };
}) {
  if (!imgUrl || !ornamentSize) return null;

  const [imgSrc, status] = useImage(imgUrl, "anonymous");
  // 장식 좌표 초기값 전달
  const [pos, setPos] = useState(initialPos);
  useEffect(() => {
    onPositionChange(pos);
  }, []);

  const radius =
    ornamentSize === "SMALL" ? 22 : ornamentSize === "MEDIUM" ? 30 : 38;

  if (status !== "loaded") return null;

  const handleMouseOver = (e: any) => {
    e.target.getStage().container().style.cursor = "pointer";
  };

  const handleMouseOut = (e: any) => {
    e.target.getStage().container().style.cursor = "default";
  };

  const handleDragEnd = (e: any) => {
    const node = e.target;

    //장식을 둘 때 살짝 커지는 효과
    node.to({
      scaleX: 1.15,
      scaleY: 1.15,
      duration: 0.08,
      onFinish: () => {
        node.to({
          scaleX: 1,
          scaleY: 1,
          duration: 0.12,
        });
      },
    });

    onDragStateChange(false);
  };

  return (
    <Group
      x={pos.x + diffX}
      y={pos.y}
      draggable
      dragBoundFunc={(position) => {
        const treeNode = (position as any).target?.getParent?.();
        const treeX = treeNode?.x?.() ?? 0;

        // 화면 밖으로 나간 트리 영역 계산
        const hidden = Math.max(0, (containerWidth - treeRect.width) / 2);

        const minX = hidden + radius;
        const maxX = Math.min(
          treeX + treeRect.width + hidden,
          containerWidth - radius,
        );
        const minY = radius;
        return {
          x: Math.min(Math.max(position.x, minX), maxX),
          y: Math.max(position.y, minY),
        };
      }}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onDragStart={() => onDragStateChange(true)}
      onDragMove={(e) => {
        const node = e.target;

        const next = {
          x: Math.round(node.x() - diffX),
          y: Math.round(node.y()),
        };

        setPos(next);
        onPositionChange(next);
      }}
      onDragEnd={handleDragEnd}
    >
      <Circle
        radius={radius * 1.05}
        fill="rgba(255, 255, 255, 0.2)"
        shadowColor="#FFFFFF"
        shadowBlur={8}
        shadowOpacity={0.9}
        shadowOffsetX={0}
        shadowOffsetY={0}
        listening={false}
      />
      <Group>
        <KonvaImage
          image={imgSrc}
          width={radius * 2}
          height={radius * 2}
          offsetX={radius}
          offsetY={radius}
        />
      </Group>
    </Group>
  );
}
