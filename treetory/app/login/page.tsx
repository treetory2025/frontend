"use client";

import GoogleLogo from "@/public/icons/google.svg";
import KakaoLogo from "@/public/icons/kakao.svg";
import BellRing1 from "@/public/icons/bell-ring1.svg";
import BellRing2 from "@/public/icons/bell-ring2.svg";

import Image from "next/image";
import style from "@/app/login/login.module.css";

export default function Page() {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  return (
    <div className={`${style.container}`}>
      <div className={`${style.loginHeadingWrapper} `}>
        <h1 className="font-memoment text-green text-7xl md:text-8xl">
          트리토리
        </h1>
        <p className="text-body text-beige text-base font-light">
          함께 완성하는 우리만의 크리스마스 이야기
        </p>
      </div>
      <div
        className={`bg-cover bg-center ${style.loginWrapper}`}
        style={{ backgroundImage: `url('/images/tree_login.png')` }}
      >
        <div className={`${style.loginButtonWrapper} w-full`}>
          <div className="flex w-34 flex-col items-center md:w-40">
            <button
              className={`${style.loginButton} bg-white`}
              onClick={() => {
                window.location.href = `${BASE_URL}/auth/login/google`;
              }}
            >
              <Image
                src={BellRing1}
                alt="로고 장식1"
                className="absolute -top-5 md:-top-5 md:size-8"
              />
              <Image src={GoogleLogo} alt="구글 로그인" />
            </button>
          </div>
          <div className="flex w-34 flex-col items-center md:w-40">
            <button
              className={`bg-[#FFEC00] ${style.loginButton}`}
              onClick={() => {
                window.location.href = `${BASE_URL}/auth/login/kakao`;
              }}
            >
              <Image
                src={BellRing2}
                alt="로고 장식2"
                className="absolute -top-3 md:-top-4 md:size-5"
              />
              <Image src={KakaoLogo} alt="구글 로그인" />
            </button>
            <div
              className={`text-beige text-caption md:text-body ${style.tooltip}`}
            >
              <p>간편하게 시작하기</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
