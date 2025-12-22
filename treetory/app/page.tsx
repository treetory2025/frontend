"use client";

import { useUserStore } from "@/store/userStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { user, clearUser } = useUserStore();

  useEffect(() => {
    if (!user) {
      clearUser();
      router.replace("/login");
      return;
    }
    router.replace(`/tree/${user.uuid}`);
  }, [user, router]);

  return null;
}
