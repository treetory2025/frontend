import { Stage } from "react-konva";
import Konva from "konva";

interface StageLayoutProps {
  children: React.ReactNode;
  draggable: boolean;
  width: number;
  height: number;
  stageRef?: React.Ref<Konva.Stage>;
}

export default function StageLayout({
  children,
  draggable,
  width,
  height,
  stageRef,
}: StageLayoutProps) {
  return (
    <Stage
      ref={stageRef}
      draggable={draggable}
      width={width}
      height={height}
      style={{
        width: "100dvw",
        height: "auto",
        touchAction: "none",
      }}
    >
      {children}
    </Stage>
  );
}
