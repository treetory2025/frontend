"use client";

import { useBookmarkStore } from "@/store/useBookmarkStore";
import { Owner } from "@/types/user";
import { createContext, useContext, useEffect, useState } from "react";

type OwnerContextType = {
  owner: Owner;
  refreshOwner: () => Promise<void>;
  uuid: string;

  isSizeSheetOpen: boolean;
  openSizeSheet: () => void;
  closeSizeSheet: () => void;
};

const OwnerContext = createContext<OwnerContextType | null>(null);

export function OwnerProvider({
  initialOwner,
  children,
  uuid,
}: {
  initialOwner: Owner;
  children: React.ReactNode;
  uuid: string;
}) {
  const [owner, setOwner] = useState<Owner>(initialOwner);
  const [isSizeSheetOpen, setIsSizeSheetOpen] = useState(false);
  const setBookmarked = useBookmarkStore((s) => s.setBookmarked);

  useEffect(() => {
    setBookmarked(owner.isBookmarked ?? false);
  }, [owner.isBookmarked, setBookmarked]);

  async function refreshOwner() {
    try {
      const res = await fetch(`/api/trees/${uuid}`, {
        credentials: "include",
      });

      if (!res.ok) {
        console.log("갱신 실패", res);
        return;
      }

      const data = await res.json();
      const newOwner = data?.body;
      setOwner(newOwner);
      console.log("갱신 성공", owner);

      return;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  return (
    <OwnerContext.Provider
      value={{
        owner,
        refreshOwner,
        uuid,
        isSizeSheetOpen,
        openSizeSheet: () => setIsSizeSheetOpen(true),
        closeSizeSheet: () => setIsSizeSheetOpen(false),
      }}
    >
      {children}
    </OwnerContext.Provider>
  );
}

export function useOwner() {
  const ctx = useContext(OwnerContext);
  if (!ctx) throw new Error("useOwner must be used within OwnerProvider");
  return ctx;
}
