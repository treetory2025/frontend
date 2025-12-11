"use client";

import Image from "next/image";
import snowmanIcon from "@/public/icons/snowman.png";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PageHeading() {
  const router = useRouter();
  return (
    <div className="text-beige bg-navy sticky top-0 z-1 box-content flex items-center gap-4 border-b-8 pb-10">
      <button className="cursor-pointer" onClick={() => router.back()}>
        <ChevronLeft size={32} />
      </button>
      <p className="text-title font-memoment select-none">
        등록된 <span className="text-green">장식목록</span>
      </p>
      <Image
        alt="Snowman Decoration"
        src={snowmanIcon}
        width={76}
        height={76}
        className="absolute right-0 -bottom-5 z-10"
      />
    </div>
  );
}
