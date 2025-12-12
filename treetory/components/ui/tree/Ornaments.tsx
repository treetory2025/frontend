import { Group, Image as KonvaImage } from "react-konva";
import { useOwner } from "@/app/(header)/tree/[uuid]/tree-context";
import type { Ornarment } from "@/types/ornarment";
import useImage from "use-image";

export default function Ornaments({
  onSelectOrnament,
}: {
  onSelectOrnament: (ornament: Ornarment) => void;
}) {
  const { owner } = useOwner();
  const ornaments = owner.ornamentsRes as Ornarment[];
  const handleMouseOver = (e: any) => {
    e.target.getStage().container().style.cursor = "pointer";
  };

  const handleMouseOut = (e: any) => {
    e.target.getStage().container().style.cursor = "default";
  };
  console.log("장식 조회 : ", ornaments);
  if (!ornaments) return null;

  return (
    <>
      {ornaments.map((o) => {
        const [imgSrc] = useImage(o.imgUrl);
        const radius = o.size === "small" ? 22 : o.size === "medium" ? 30 : 38;

        return (
          <Group
            key={o.ornamentId}
            x={o.positionX}
            y={o.positionY}
            clipFunc={(ctx) => {
              ctx.arc(0, 0, radius, 0, Math.PI * 2, false);
            }}
            draggable={false}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            onClick={() => onSelectOrnament(o)}
            onTap={() => onSelectOrnament(o)}
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
      })}
    </>
  );
}
