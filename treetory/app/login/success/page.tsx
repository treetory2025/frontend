"use client";

import { useUserStore } from "@/store/useStore";
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
      setUser(data);
      //    임시로 tree/1로 이동
      router.replace(`/tree/${data.uuid ?? "1"}`);
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
