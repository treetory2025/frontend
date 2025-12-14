import { create } from "zustand";
import type { User, Owner } from "@/types/user";
import { persist } from "zustand/middleware";
import { BackgroundType } from "@/types/theme";

interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
  clearUser: () => void;
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
      _hasHydrated: false,
      setHasHydrated: (state) => {
        set({
          _hasHydrated: state,
        });
      },
    }),
    {
      name: "user-storage", // localStorage key
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);

interface ThemeState {
  theme: BackgroundType | null;
  setTheme: (theme: BackgroundType | null) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  // 디폴트 - 고요한 밤 임시 설정
  theme: "SILENT_NIGHT",
  setTheme: (theme) => set({ theme }),
}));
