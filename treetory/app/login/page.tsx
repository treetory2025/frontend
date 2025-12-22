"use client";

import GoogleLogo from "@/public/icons/google.svg";
import KakaoLogo from "@/public/icons/kakao.svg";
import BellRing1 from "@/public/icons/bell-ring1.svg";
import BellRing2 from "@/public/icons/bell-ring2.svg";

import Image from "next/image";
import style from "@/app/login/login.module.css";
import { useState } from "react";

// 카카오인앱브라우저 확인
const isKakaoInAppBrowser = () => {
  if (typeof window === "undefined") return false;
  return navigator.userAgent.toLowerCase().includes("kakaotalk");
};
const isIOS = () => /iphone|ipad|ipod/i.test(navigator.userAgent);
const isAndroid = () => /android/i.test(navigator.userAgent);

// os별 새 브라우저 열기
const openExternalOnIOS = (url: string) => {
  window.location.href = `kakaotalk://web/openExternal?url=${encodeURIComponent(url)}`;
};

const openExternalOnAndroid = (url: string) => {
  const { host, origin } = window.location;
  const path = url.replace(origin, "");

  window.location.href =
    `intent://${host}${path}` +
    `#Intent;scheme=https;package=com.android.chrome;end`;
};

const openInExternalBrowser = (path: string) => {
  if (!isKakaoInAppBrowser()) return;

  const url = `${window.location.origin}${path}`;

  if (isIOS()) {
    openExternalOnIOS(url);
    return;
  }

  if (isAndroid()) {
    openExternalOnAndroid(url);
  }
};

export default function Page() {
  const [showExternalGuide, setShowExternalGuide] = useState(false);
  const [pendingLoginPath, setPendingLoginPath] = useState<string | null>(null);

  const handleGoogleLoginClick = (path: string) => {
    if (isKakaoInAppBrowser()) {
      setPendingLoginPath(path);
      setShowExternalGuide(true);
      return;
    }

    window.location.href = path;
  };

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
              onClick={() => handleGoogleLoginClick("/api/auth/login/google")}
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
                window.location.href = `/api/auth/login/kakao`;
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
      {showExternalGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-beige w-80 rounded-xl p-6 text-center">
            <h2 className="text-subtitle text-fg-primary mb-3 font-bold">
              외부 브라우저로 이동 안내
            </h2>
            <p className="text-body text-fg-secondary mb-5">
              카카오톡 브라우저에서는
              <br />
              구글 로그인이 원활하지 않아
              <br />
              외부 브라우저에서 진행해 주세요.
            </p>
            <div className="flex gap-3">
              <button
                className="bg-muted-bg flex-1 rounded-lg py-2"
                onClick={() => setShowExternalGuide(false)}
              >
                취소
              </button>
              <button
                className="bg-green flex-1 rounded-lg py-2 text-white"
                onClick={() => {
                  if (pendingLoginPath) {
                    openInExternalBrowser(pendingLoginPath);
                  }
                }}
              >
                이동
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
