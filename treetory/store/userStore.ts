import { create } from "zustand";
import type { User, Owner } from "@/types/user";
import { persist } from "zustand/middleware";

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

interface OwnerState {
  owner: Owner | null;
  setOwner: (owner: Owner | null) => void;
  clearOwner: () => void;
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
}
export const useOwnerStore = create<OwnerState>()(
  persist(
    (set) => ({
      owner: null,
      setOwner: (owner) => set({ owner }),
      clearOwner: () => set({ owner: null }),
      _hasHydrated: false,
      setHasHydrated: (state) => {
        set({
          _hasHydrated: state,
        });
      },
    }),
    {
      name: "owner-storage", // localStorage key
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
