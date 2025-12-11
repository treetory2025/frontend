"use client";

import { Owner } from "@/types/user";
import { createContext, useContext } from "react";

const OwnerContext = createContext<Owner | null>(null);

export function OwnerProvider({
  value,
  children,
}: {
  value: Owner;
  children: React.ReactNode;
}) {
  return (
    <OwnerContext.Provider value={value}>{children}</OwnerContext.Provider>
  );
}

export function useOwner() {
  const ctx = useContext(OwnerContext);
  if (!ctx) throw new Error("useOwner must be used within OwnerProvider");
  return ctx;
}
