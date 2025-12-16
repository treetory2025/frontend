export const exportTreeImage = async (dataURL: string) => {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent); // 모바일 감지

  if (isMobile && navigator.share) {
    try {
      const blob = await (await fetch(dataURL)).blob();
      const file = new File([blob], "my-Treetory.png", { type: "image/png" });

      await navigator.share({
        files: [file],
        title: `2025 트리토리 공유`,
      });
      return;
    } catch {
      // 사용자가 공유 취소한 경우 : 그냥 종료
      return;
    }
  } else {
    // 데스크탑: 다운로드
    const link = document.createElement("a");
    link.download = "my-Treetory.png";
    link.href = dataURL;
    link.click();
  }
};
