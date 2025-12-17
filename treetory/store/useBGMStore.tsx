import { create } from "zustand";
import { persist } from "zustand/middleware";

type BgmState = {
  enabled: boolean;
  toggle: () => void;
  on: () => void;
  off: () => void;
};

export const useBgmStore = create<BgmState>((set) => ({
  enabled: false,
  toggle: () => set((s) => ({ enabled: !s.enabled })),
  on: () => set({ enabled: true }),
  off: () => set({ enabled: false }),
}));
