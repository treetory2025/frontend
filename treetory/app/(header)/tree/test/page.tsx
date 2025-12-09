"use client";

import { useState, useRef, useEffect } from "react";
import { Stage, Layer } from "react-konva";
import { Tree } from "@/components/tree/Tree";
import { BottomLayer } from "@/components/tree/TreeLayer";

type TreeType = "default" | "tree1" | "tree2";

interface TreeItem {
  type: TreeType;
  scale: number;
  offset: number;
}

export default function TreeScaleTest() {
  const containerRef = useRef<HTMLDivElement>(null);

  const [size, setSize] = useState({ width: 0, height: 0 });

  // 트리 리스트

  const [trees, setTrees] = useState<TreeItem[]>([
    { type: "default", scale: 1, offset: 0 },
  ]);
  useEffect(() => {
    function updateSize() {
      if (!containerRef.current) return;
      const { clientWidth, clientHeight } = containerRef.current;
      setSize({ width: clientWidth, height: clientHeight });
    }

    updateSize();
    const observer = new ResizeObserver(updateSize);
    const el = containerRef.current;
    if (el) observer.observe(el);

    window.addEventListener("resize", updateSize);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  // 트리 추가 버튼
  const addTree = () => {
    setTrees((prev) => {
      const last = prev[prev.length - 1];
      const nextScale = last.scale * 1.25;

      const nextOffset = last.offset + 72;

      const nextType = prev.length % 2 === 1 ? "tree1" : "tree2";

      return [
        ...prev,
        { type: nextType, scale: nextScale, offset: nextOffset },
      ];
    });
  };

  return (
    <div ref={containerRef} className="relative h-full w-full">
      <button
        onClick={addTree}
        className="absolute right-4 bottom-4 z-50 rounded-lg bg-white px-4 py-2 shadow"
      >
        트리 추가
      </button>

      <Stage width={size.width} height={size.height}>
        <Layer>
          {trees.map((t, i) => (
            <Tree
              key={i}
              containerWidth={size.width}
              containerHeight={size.height}
              type={t.type}
              scale={t.scale}
              offsetY={t.offset}
            />
          ))}

          <BottomLayer
            containerWidth={size.width}
            containerHeight={size.height}
          />
        </Layer>
      </Stage>
    </div>
  );
}
