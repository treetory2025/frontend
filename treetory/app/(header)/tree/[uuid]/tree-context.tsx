"use client";

import { getTreeOwner } from "@/lib/api";
import { Owner } from "@/types/user";
import { createContext, useContext, useState } from "react";

type OwnerContextType = {
  owner: Owner;
  refreshOwner: (uuid: string) => Promise<void>;
};

const OwnerContext = createContext<OwnerContextType | null>(null);

export function OwnerProvider({
  initialOwner,
  children,
}: {
  initialOwner: Owner;
  children: React.ReactNode;
}) {
  const [owner, setOwner] = useState<Owner>(initialOwner);

  async function refreshOwner(uuid: string) {
    const newOwner = await getTreeOwner(uuid);
    setOwner(newOwner);
  }

  return (
    <OwnerContext.Provider value={{ owner, refreshOwner }}>
      {children}
    </OwnerContext.Provider>
  );
}

export function useOwner() {
  const ctx = useContext(OwnerContext);
  if (!ctx) throw new Error("useOwner must be used within OwnerProvider");
  return ctx;
}
