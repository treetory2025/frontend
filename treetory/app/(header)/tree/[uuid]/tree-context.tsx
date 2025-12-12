"use client";

import { Owner } from "@/types/user";
import { createContext, useContext, useState } from "react";

type OwnerContextType = {
  owner: Owner;
  refreshOwner: () => Promise<void>;
  uuid: string;
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

  async function refreshOwner() {
    try {
      const res = await fetch(`/api/trees/${uuid}`, {
        credentials: "include",
      });

      if (!res.ok) {
        console.log("갱싱 실패", res);
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
    <OwnerContext.Provider value={{ owner, refreshOwner, uuid }}>
      {children}
    </OwnerContext.Provider>
  );
}

export function useOwner() {
  const ctx = useContext(OwnerContext);
  if (!ctx) throw new Error("useOwner must be used within OwnerProvider");
  return ctx;
}
