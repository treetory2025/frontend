"use client";

export const useOpenExternalBrowser = () => {
  const openExternalBrowser = (url: string) => {
    const ua = navigator.userAgent.toLowerCase();

    // iOS (카카오톡에게 외부 브라우저 열기 위임)
    if (/iphone|ipad|ipod/.test(ua)) {
      window.location.href = `kakaotalk://web/openExternal?url=${encodeURIComponent(url)}`;
      return;
    }

    // Android (OS 기본 브라우저)
    if (/android/.test(ua)) {
      window.location.href =
        "intent://" +
        url.replace(/^https?:\/\//, "") +
        "#Intent;scheme=https;action=android.intent.action.VIEW;end";
    }
  };

  return { openExternalBrowser };
};
