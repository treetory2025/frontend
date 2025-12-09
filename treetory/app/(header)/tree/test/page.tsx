"use client";

import { useState, useRef, useEffect } from "react";
import { Stage, Layer, Group } from "react-konva";
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
    { type: "default", scale: 1.25, offset: 0 },
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

  const lastTree = trees[trees.length - 1];
  const calculateDynamicHeight = () => {
    const positions = trees.map((t) => {
      const treeBaseHeight = 349; // 원본 트리 높이
      const h = treeBaseHeight * t.scale;
      return t.offset + h;
    });

    const maxTreeBottom = Math.max(...positions, 0);

    return Math.max(size.height, maxTreeBottom + 150); // padding
  };

  const dynamicHeight = calculateDynamicHeight();

  // 트리 추가 버튼
  const addTree = () => {
    setTrees((prev) => {
      const last = prev[prev.length - 1];
      const nextScale = last.scale * 1.25;
      const nextOffset = last.offset + 120;

      const nextType = prev.length % 2 === 1 ? "tree1" : "tree2";

      return [
        ...prev,
        { type: nextType, scale: nextScale, offset: nextOffset },
      ];
    });
  };

  return (
    <div
      ref={containerRef}
      className="no-scrollbar relative w-full overflow-y-scroll"
      style={{ height: "100dvh" }}
    >
      <button
        onClick={addTree}
        className="absolute right-0 bottom-0 z-50 rounded-lg bg-white px-4 py-2 shadow"
      >
        트리 추가
      </button>
      <div
        style={{
          width: size.width,
          height: dynamicHeight,
          zIndex: 1,
        }}
      >
        <Stage width={size.width} height={dynamicHeight}>
          <Layer>
            <Group y={-40 - lastTree.offset * 0.5}>
              {[...trees].reverse().map((t, i) => (
                <Tree
                  key={i}
                  containerWidth={size.width}
                  containerHeight={dynamicHeight}
                  type={t.type}
                  scale={t.scale}
                  offsetY={t.offset}
                />
              ))}
            </Group>
            {/* 스텀프 위치  */}
            <BottomLayer
              containerWidth={size.width}
              containerHeight={dynamicHeight}
            />
          </Layer>
        </Stage>
      </div>
    </div>
  );
}
