"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PageHeading({ title }: { title: string }) {
  const router = useRouter();
  return (
    <div className="text-beige flex items-center gap-4 px-4">
      <button className="cursor-pointer" onClick={() => router.back()}>
        <ChevronLeft size={32} />
      </button>
      <p className="text-title font-memoment select-none">
        트리토리 <span className="text-green">{title}</span>
      </p>
    </div>
  );
}
