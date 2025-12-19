"use client";

import { useAlert } from "@/hooks/useAlert";
import { apiFetch } from "@/lib/api";
import { useBookmarkStore } from "@/store/useBookmarkStore";
import { Owner } from "@/types/user";
import { notFound, useRouter } from "next/navigation";
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
  initialOwner: Owner | null;
  children: React.ReactNode;
  uuid: string;
}) {
  const [owner, setOwner] = useState<Owner | null>(initialOwner);
  const [isSizeSheetOpen, setIsSizeSheetOpen] = useState(false);
  const setBookmarked = useBookmarkStore((s) => s.setBookmarked);
  const router = useRouter();

  const [hydrated, setHydrated] = useState(false);
  const alert = useAlert();

  async function refreshOwner() {
    try {
      const res = await fetch(`/api/trees/${uuid}`, {
        credentials: "include",
      });

      if (res.status === 404) {
        // 존재하지 않는 트리 uuid
        setOwner(null);
        setHydrated(true);
        return;
      }

      if (!res.ok) {
        console.log("갱신 실패", res);
        return;
      }

      const data = await res.json();
      const newOwner = data?.body;
      setOwner(newOwner);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  // 마운트 시 최신 owner를 반드시 다시 가져옴
  useEffect(() => {
    const init = async () => {
      await refreshOwner();
      setHydrated(true);
    };

    init();
  }, []);

  // owner가 없으면 Not found로 이동
  useEffect(() => {
    if (!hydrated) return;

    if (!owner) {
      alert("요청하신 트리는 삭제되었거나 잘못된 주소입니다.");
      setHydrated(true);
      notFound();
      return;
    }
  }, [hydrated, owner]);

  // 북마크 상태 동기화
  useEffect(() => {
    console.log(owner);
    if (!hydrated || !owner) return;

    if (typeof owner.isBookmarked === "boolean") {
      setBookmarked(owner.isBookmarked);
    }
  }, [hydrated, owner, setBookmarked]);

  /** 아직 준비 안 됐거나 redirect 중이면 렌더링 차단 */
  if (!hydrated || !owner) {
    return null;
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
