"use client";

import { useState, useRef, useEffect } from "react";

import { textUser } from "@/app/mock/userInfoMock";
import { useParams } from "next/navigation";
import { Owner } from "@/types/user";
import { Group, Layer, Stage } from "react-konva";
import { Tree } from "@/components/tree/Tree";

type TreeType = "default" | "add1" | "tree2";

interface TreeItem {
  theme?: string;
  type: TreeType;
  scale: number;
  offset: number;
  isEnd: boolean;
}

export default function Page() {
  // uuid 가져오기
  const params = useParams();
  const uuid = params.uuid;

  // 전체 사이즈 규격 초기화
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  // 사이트 소유자 초기화
  const [owner, setOwner] = useState<Owner | null>(null);
  // 트리 리스트 초기화
  const [trees, setTrees] = useState<TreeItem[]>([]);

  useEffect(() => {
    async function getOwner() {
      const res = await fetch(`/api/trees/${uuid}`, {
        credentials: "include",
      });

      if (!res.ok) {
        console.log("목업 사용하기");
        setOwner(textUser.body);
        console.log(textUser.body);
        return;
      }
      const data = await res.json();
      console.log("트리조회성공: ", data);
    }

    getOwner();
  }, [uuid]);

  useEffect(() => {
    if (!owner) return; // owner가 없으면 실행 X

    const defaultTree: TreeItem = {
      theme: owner.treeTheme,
      type: "default",
      scale: 1.25,
      offset: 0,
      isEnd: false,
    };

    setTrees([defaultTree]);
  }, [owner]);

  useEffect(() => {
    if (!owner || trees.length === 0) return;

    const size = owner.treeSize; // 예: 3
    if (!size || size < 2) return;

    setTrees((prev) => {
      const newTrees = [...prev];

      for (let i = 1; i < size; i++) {
        const last = newTrees[newTrees.length - 1];

        const nextScale = last.scale * 1.25;
        const nextOffset = last.offset + 120;
        const nextType = newTrees.length % 2 === 1 ? "add1" : "tree2";

        newTrees.push({
          theme: owner.treeTheme,
          type: nextType,
          scale: nextScale,
          offset: nextOffset,
          isEnd: i === size - 1, // 마지막 트리는 end 처리
        });
      }

      return newTrees;
    });
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

  const addTree = () => {
    if (!owner || trees.length === 0) return;

    setTrees((prev) => {
      const newTrees = [...prev];
      const last = newTrees[newTrees.length - 1];

      const nextScale = last.scale * 1.25;
      const nextOffset = last.offset + 120;
      const nextType = newTrees.length % 2 === 1 ? "add1" : "tree2";

      // 기존 마지막 트리 isEnd false 처리
      newTrees[newTrees.length - 1].isEnd = false;

      newTrees.push({
        theme: owner.treeTheme,
        type: nextType,
        scale: nextScale,
        offset: nextOffset,
        isEnd: true,
      });

      return newTrees;
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
        className="absolute right-0 bottom-0 z-50 cursor-pointer rounded-lg bg-white px-4 py-2 shadow"
      >
        트리 추가
      </button>
      <div style={{ width: size.width, height: dynamicHeight, zIndex: 1 }}>
        <Stage
          width={size.width}
          height={dynamicHeight}
          offsetY={
            dynamicHeight > 600 && size.width > 540
              ? -dynamicHeight * 0.2
              : -dynamicHeight * 0.3
          }
        >
          <Layer>
            <Group draggable={true}>
              {[...trees].reverse().map((t, i) => (
                <Tree
                  key={i}
                  containerWidth={size.width}
                  containerHeight={dynamicHeight}
                  scale={t.scale}
                  isEnd={i === 0}
                  offset={t.offset}
                  theme={t.theme ? t.theme : ""}
                  type={t.type}
                />
              ))}
            </Group>
          </Layer>
        </Stage>
      </div>
    </div>
  );
}
