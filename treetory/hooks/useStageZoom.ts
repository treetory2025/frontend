import Konva from "konva";
import { useRef, useState } from "react";

type Options = {
  minScale?: number;
  maxScale?: number;
  scaleBy?: number;
};

export function useStageZoom(
  stageRef: React.RefObject<Konva.Stage | null>,
  { minScale = 1, maxScale = 1.6, scaleBy = 1.05 }: Options = {},
) {
  const [scale, setScale] = useState(1);

  // pinch state
  const lastDist = useRef<number | null>(null);
  const pinchAnchor = useRef<{ x: number; y: number } | null>(null);
  const pinchWorldPoint = useRef<{ x: number; y: number } | null>(null);

  // 드래그 줌 함수 (데스크)
  const handleWheel = (e: Konva.KonvaEventObject<WheelEvent>) => {
    e.evt.preventDefault();

    const stage = stageRef.current;
    if (!stage) return;

    const oldScale = stage.scaleX();
    const pointer = stage.getPointerPosition();
    if (!pointer) return;

    const direction = e.evt.deltaY > 0 ? -1 : 1;
    const newScale = direction > 0 ? oldScale * scaleBy : oldScale / scaleBy;

    const clampedScale = Math.max(minScale, Math.min(maxScale, newScale));
    if (clampedScale === oldScale) return;

    const mousePointTo = {
      x: (pointer.x - stage.x()) / oldScale,
      y: (pointer.y - stage.y()) / oldScale,
    };

    stage.scale({ x: clampedScale, y: clampedScale });
    stage.position({
      x: pointer.x - mousePointTo.x * clampedScale,
      y: pointer.y - mousePointTo.y * clampedScale,
    });

    setScale(clampedScale);
  };

  const resetScale = () => {
    const stage = stageRef.current;
    if (!stage) return;

    stage.scale({ x: 1, y: 1 });
    stage.position({ x: 0, y: 0 });
    setScale(1);
  };

  // 모바일 줌 핀치
  const handleTouchMove = (e: Konva.KonvaEventObject<TouchEvent>) => {
    const stage = stageRef.current;
    if (!stage) return;

    const touches = e.evt.touches;

    if (touches.length === 1) {
      stage.draggable(false); // 터치 드래그 -> Tree 전가
      return;
    }

    // 줌 핀치 이벤트 차단
    if (touches.length === 2) return;

    // drag 완전 차단
    stage.stopDrag();
    stage.draggable(false);
    e.evt.preventDefault();

    const [t1, t2] = touches;

    const p1 = { x: t1.clientX, y: t1.clientY };
    const p2 = { x: t2.clientX, y: t2.clientY };

    const center = {
      x: (p1.x + p2.x) / 2,
      y: (p1.y + p2.y) / 2,
    };

    const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);

    // pinch start
    if (!lastDist.current) {
      lastDist.current = dist;

      pinchAnchor.current = center;

      const oldScale = stage.scaleX();
      pinchWorldPoint.current = {
        x: (center.x - stage.x()) / oldScale,
        y: (center.y - stage.y()) / oldScale,
      };

      return;
    }

    const oldScale = stage.scaleX();
    let newScale = oldScale * (dist / lastDist.current);
    newScale = Math.max(minScale, Math.min(maxScale, newScale));

    stage.scale({ x: newScale, y: newScale });

    const anchor = pinchAnchor.current!;
    const worldPoint = pinchWorldPoint.current!;

    stage.position({
      x: anchor.x - worldPoint.x * newScale,
      y: anchor.y - worldPoint.y * newScale,
    });

    lastDist.current = dist;
    setScale(newScale);
  };

  const handleTouchEnd = () => {
    const stage = stageRef.current;
    if (!stage) return;

    stage.draggable(false);

    lastDist.current = null;
    pinchAnchor.current = null;
    pinchWorldPoint.current = null;
  };

  return {
    scale,
    handleWheel,
    handleTouchMove,
    handleTouchEnd,
    resetScale,
  };
}
