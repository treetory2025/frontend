"use client";

import { Owner } from "@/types/user";
import { useEffect, useState, useRef } from "react";
import { Layer, Stage } from "react-konva";
import { Tree } from "@/components/ui/tree/Tree";
import { useOwner } from "@/app/(header)/tree/[uuid]/tree-context";
import { useRouter } from "next/navigation";
interface TreePageProps {
  owner: Owner;
}

export default function TreePage() {
  const { owner, uuid } = useOwner();
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [treeHeight, setTreeHeight] = useState(0);
  const [treeSize, setTreeSize] = useState(3);

  const router = useRouter();

  useEffect(() => {
    //  storeOwner가 아직 없으면 바로 저장
    if (!owner) {
      return;
    }

    setTreeSize(owner.treeSize ?? 3);
  }, [owner]);

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
      className={`no-scrollbar relative mb-0 h-full w-full overflow-y-scroll`}
      ref={containerRef}
    >
      <div
        style={{
          width: size.width,
          height: size.height,
          zIndex: 1,
        }}
      >
        <Stage
          width={size.width}
          height={Math.max(size.height, treeHeight + 120)}
        >
          <Layer draggable={true}>
            <Tree
              containerWidth={size.width}
              containerHeight={size.height}
              scale={1.0}
              theme={owner.treeTheme}
              size={owner.treeSize}
              onLoad={(h: number) => setTreeHeight(h)}
            />
          </Layer>
        </Stage>
      </div>
      <button
        className="bg-skyblue text-button text-navy absolute right-0 bottom-20 left-auto translate-x-0 cursor-pointer rounded-full border-4 border-white px-6 py-5 font-bold md:bottom-10"
        onClick={() => {
          router.push(`/tree/${uuid}/ornaments`);
        }}
      >
        장식하기
      </button>
    </div>
  );
}
