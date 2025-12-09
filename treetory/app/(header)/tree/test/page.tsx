"use client";

import { BottomLayer, DefaultTree } from "@/components/tree/TreeLayer";
import { useState, useRef, useEffect } from "react";
import { Stage, Layer, Group, Rect, Image as KonvaImage } from "react-konva";
import useImage from "use-image";
import style from "@/app/(header)/tree/test/test.module.css";

// const BASE_WIDTH = 440;
// const BASE_HEIGHT = 370;
// const GROWTH = 1.25;

export default function TreeScaleTest() {
  const containerRef = useRef<HTMLDivElement>(null);
  // 트리 layer 사이즈
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [bottomImage] = useImage("/images/main/snow-bottom.png");

  useEffect(() => {
    function updateSize() {
      if (!containerRef.current) return;
      const { clientWidth, clientHeight } = containerRef.current;
      setSize({ width: clientWidth, height: clientHeight });
    }

    updateSize();

    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver(updateSize);
    observer.observe(el);

    window.addEventListener("resize", updateSize);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  return (
    <div ref={containerRef} className="h-full w-full">
      {!size.width && <div></div>}
      <Stage width={size.width} height={size.height}>
        <Layer>
          <Group offsetY={size.height > 720 ? 60 : 20}>
            <DefaultTree
              containerWidth={size.width}
              containerHeight={size.height}
            />
          </Group>
          <BottomLayer
            containerWidth={size.width}
            containerHeight={size.height}
          />
        </Layer>
      </Stage>
    </div>
  );
}
