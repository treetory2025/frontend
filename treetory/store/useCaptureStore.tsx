import { create } from "zustand";

type CaptureStore = {
  captureFn: (() => void) | null;

  registerCapture: (fn: () => void) => void;
  clear: () => void;
  capture: () => void;
};

export const useCaptureStore = create<CaptureStore>((set, get) => ({
  captureFn: null,

  registerCapture: (fn) => set({ captureFn: fn }),

  clear: () => set({ captureFn: null }),

  capture: () => {
    const fn = get().captureFn;
    if (fn) fn();
  },
}));
