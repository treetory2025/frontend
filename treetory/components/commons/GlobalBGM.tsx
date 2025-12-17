"use client";

import { useBgmStore } from "@/store/useBGMStore";
import { useEffect, useRef } from "react";

export default function GlobalBGM() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const enabled = useBgmStore((s) => s.enabled);

  useEffect(() => {
    if (!audioRef.current) return;

    if (enabled) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  }, [enabled]);

  return (
    <audio ref={audioRef} src="/music/treetoryBGM.MP3" loop preload="auto" />
  );
}
