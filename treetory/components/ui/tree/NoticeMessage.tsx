import Image from "next/image";
import SantaIcon from "@/public/icons/santa.png";

export default function NoticeMessage() {
  return (
    <div className="mb-4 flex w-full flex-col items-end">
      {/* 배너 박스 */}
      <div className="bg-navy text-beige text-body relative flex items-center gap-2 rounded-md px-4 py-2">
        <Image src={SantaIcon} alt="santa" className="size-6" />
        <span className="whitespace-nowrap">크리스마스 당일에 공개됩니다!</span>
      </div>

      {/* 아래 꼬리 삼각형 */}
      <div
        className="bg-navy mr-8 h-3 w-4"
        style={{
          clipPath: "polygon(50% 100%, 0% 0%, 100% 0%)",
        }}
      />
    </div>
  );
}
