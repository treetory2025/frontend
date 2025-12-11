"use client";

import { Owner } from "@/types/user";
import { useEffect, useState, useRef } from "react";
import { useOwnerStore } from "@/store/userStore";
import useImage from "use-image";
import { Group, Layer, Stage, Image as KonvaImage } from "react-konva";
import { Tree } from "@/components/tree/Tree";
interface TreePageProps {
  owner: Owner;
}

export default function TreePage({ owner }: TreePageProps) {
  const { setOwner, owner: storeOwner } = useOwnerStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [treeHeight, setTreeHeight] = useState(0);
  const [treeSize, setTreeSize] = useState(3);

  useEffect(() => {
    //  storeOwner가 아직 없으면 바로 저장
    if (!storeOwner) {
      setOwner(owner);
      setTreeSize(owner.treeSize ?? 3);

      return;
    }
    //  기존과 동일하면 업데이트 진행 멈춤
    if (JSON.stringify(storeOwner) === JSON.stringify(owner)) {
      return;
    }

    setOwner(owner);
    setTreeSize(owner.treeSize ?? 3);
  }, [owner, storeOwner, setOwner]);

  // 트리 규격에 따른 사이즈 확인
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

  const increaseTreeSize = () => {
    setTreeSize((prev) => Math.min(prev + 1, 10));
  };
  return (
    <div
      className="no-scrollbar relative w-full overflow-y-scroll"
      ref={containerRef}
      style={{ height: "100dvh" }}
    >
      <button
        className="z-10 cursor-pointer rounded-2xl bg-white px-8 py-4"
        onClick={() => increaseTreeSize()}
      >
        추가하기
      </button>
      <div
        style={{
          width: size.width,
          height: size.height,
          zIndex: 1,
          paddingTop: 40,
        }}
      >
        <Stage width={size.width} height={Math.max(size.height, treeHeight)}>
          <Layer draggable={true}>
            <Tree
              containerWidth={size.width}
              scale={1.0}
              theme={owner.treeTheme}
              size={treeSize}
              onLoad={(h: number) => setTreeHeight(h)}
            />
          </Layer>
        </Stage>
      </div>
    </div>
  );
}
