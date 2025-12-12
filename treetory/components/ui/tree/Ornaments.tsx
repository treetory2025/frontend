import { Group, Image as KonvaImage } from "react-konva";
import { useOwner } from "@/app/(header)/tree/[uuid]/tree-context";
import type { Ornarment } from "@/types/ornarment";
import useImage from "use-image";

export default function Ornaments() {
  const { owner } = useOwner();
  const ornaments = owner.ornamentsRes as Ornarment[];
  console.log(ornaments);
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
