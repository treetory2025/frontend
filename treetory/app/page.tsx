"use client";

import { useUserStore } from "@/store/userStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const user = useUserStore((s) => s.user);

  useEffect(() => {
    if (!user) {
      router.replace("/login");
      return;
    }
    router.replace(`/tree/${user.uuid}`);
  }, [user, router]);

  return null;
}
