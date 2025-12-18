// "use client";

import { Group, Image as KonvaImage } from "react-konva";
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
  imgUrl,
  ornamentSize,
  onDragStateChange,
  diffX,
  onPositionChange,
}: {
  imgUrl?: string;
  ornamentSize?: string;
  onDragStateChange: (dragging: boolean) => void;
  onPositionChange: (pos: { x: number; y: number }) => void;

  diffX: number;
}) {
  if (!imgUrl || !ornamentSize) return;

  const [imgSrc] = useImage(imgUrl, "anonymous");
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const radius =
    ornamentSize === "SMALL" ? 22 : ornamentSize === "MEDIUM" ? 30 : 38;

  return (
    <Group
      x={pos.x + diffX}
      y={pos.y}
      clipFunc={(ctx) => {
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
      }}
      draggable
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
      onDragEnd={() => onDragStateChange(false)}
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
