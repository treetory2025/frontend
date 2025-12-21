"use client";

import { useUserStore } from "@/store/userStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import style from "@/app/login/login.module.css";

export default function Page() {
  const router = useRouter();
  const setUser = useUserStore.getState().setUser;

  useEffect(() => {
    async function getUser() {
      const res = await fetch("/api/members/me", { credentials: "include" });
      //   인증된 사용자 정보 불러오기 실패
      if (!res.ok) {
        router.replace("/login");
        return;
      }

      const data = await res.json();
      const user = data?.body ?? data;
      setUser(user);

      if (!user?.uuid) {
        console.error("UUID가 없습니다:", user);
        router.replace("/login");
        return;
      }

      requestAnimationFrame(() => {
        router.replace(`/tree/${user.uuid}`);
      });
    }

    getUser();
  }, []);

  return (
    <div className={`${style.container}`}>
      <div className={`${style.loginHeadingWrapper} `}>
        <h1 className="font-memoment text-green text-7xl md:text-8xl">
          트리토리
        </h1>
        <p className="text-beige text-subtitle font-light">로그인 성공!</p>
        <p className="text-beige text-body font-light">
          정보를 불러오고 있습니다...
        </p>
      </div>
    </div>
  );
}
