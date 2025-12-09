"use client";

import { DefaultTree } from "@/components/tree/TreeLayer";
import { h1 } from "motion/react-client";
import { useState, useRef, useEffect } from "react";
import { Stage, Layer, Group, Rect, Image as KonvaImage } from "react-konva";
import useImage from "use-image";

// const BASE_WIDTH = 440;
// const BASE_HEIGHT = 370;
// const GROWTH = 1.25;

export default function TreeScaleTest() {
  const containerRef = useRef<HTMLDivElement>(null);
  // 트리 layer 사이즈
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver(() => {
      const { clientWidth, clientHeight } = containerRef.current!;
      setSize({ width: clientWidth, height: clientHeight });
    });

    resizeObserver.observe(containerRef.current);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="h-full w-full">
      {/* dom 인식 전 */}
      {!size.width && <h1 className="text-title text-beige text-center"></h1>}

      <Stage width={size.width} height={size.height}>
        {/* 트리 렌더 */}
        <Layer>
          <DefaultTree
            containerWidth={size.width}
            containerHeight={size.height}
          />
        </Layer>
      </Stage>
    </div>
  );
}
