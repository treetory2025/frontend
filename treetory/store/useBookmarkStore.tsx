import { create } from "zustand";

type BookmarkState = {
  isBookmarked: boolean;
  setBookmarked: (v: boolean) => void;
  toggleBookmarked: () => void;
};

export const useBookmarkStore = create<BookmarkState>((set) => ({
  isBookmarked: false,

  setBookmarked: (v) => set({ isBookmarked: v }),

  toggleBookmarked: () =>
    set((state) => ({ isBookmarked: !state.isBookmarked })),
}));
