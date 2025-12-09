"use client";

import { useState, useRef, useEffect } from "react";
import { Stage, Layer, Group, Rect, Image as KonvaImage } from "react-konva";
import useImage from "use-image";
import tree0 from "@/public/images/main/snow-tree(default).png";
import tree1 from "@/public/images/main/snow-tree1.png";
import tree2 from "@/public/images/main/snow-tree2.png";

// const BASE_WIDTH = 440;
// const BASE_HEIGHT = 370;
// const GROWTH = 1.25;

export default function TreeScaleTest() {
  const [tree0Image] = useImage("/images/main/snow-tree(default).png");
  const containerRef = useRef<HTMLDivElement>(null);
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
      {size.width > 0 && (
        <Stage width={size.width} height={size.height}>
          <Layer>
            {tree0Image &&
              (() => {
                const originalWidth = tree0Image.width;
                const originalHeight = tree0Image.height;

                const targetWidth = size.width * 1.0;
                const scale = targetWidth / originalWidth;

                return (
                  <KonvaImage
                    image={tree0Image}
                    scale={{ x: scale, y: scale }} // ★ 비율 유지
                    x={(size.width - originalWidth * scale) / 2}
                    y={(size.height - originalHeight * scale) / 2}
                  />
                );
              })()}
          </Layer>
        </Stage>
      )}
    </div>
  );
}
