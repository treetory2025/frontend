// "use client";

import { Group, Image as KonvaImage } from "react-konva";
import { useOwner } from "@/app/(header)/tree/[uuid]/tree-context";
import type { Ornarment } from "@/types/ornarment";
import useImage from "use-image";

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

  console.log(diffX);

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
  const [imgSrc] = useImage(ornament.imgUrl);

  const radius =
    ornament.size === "SMALL" ? 22 : ornament.size === "MEDIUM" ? 30 : 38;

  console.log(ornament, radius);

  const handleMouseOver = (e: any) => {
    e.target.getStage().container().style.cursor = "pointer";
  };

  const handleMouseOut = (e: any) => {
    e.target.getStage().container().style.cursor = "default";
  };
  console.log(diffX);

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
