import { Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { apiFetch } from "@/lib/api";
import { useOwner } from "@/app/(header)/tree/[uuid]/tree-context";

export default function AddTreeButton({ uuid }: { uuid: string }) {
  const [showTooltip, setShowTooltip] = useState(true); // tooltip 시작 시 보임
  const [fade, setFade] = useState(false); // opacity 컨트롤
  const { owner, refreshOwner } = useOwner();

  // mount 후 1초 뒤 페이드아웃
  useEffect(() => {
    const timer = setTimeout(() => setFade(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const increaseTreeSize = async () => {
    try {
      const res = await apiFetch(`/trees/size`, {
        method: "PATCH",
        credentials: "include",
      });

      if (res.ok) {
        await refreshOwner(uuid);
        return;
      }

      switch (res.status) {
        case 400:
          alert("트리 사이즈가 최대를 넘어 더 이상 추가할 수 없습니다.");
          break;
        case 401:
          alert("권한이 없는 사용자가 트리 사이즈를 추가하려고 했습니다.");
          break;
        default:
          alert("트리 사이즈 변경 중 알 수 없는 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error("트리 사이즈 변경 중 네트워크 에러", error);
      alert("네트워크 오류로 트리 사이즈 변경에 실패했습니다.");
    }
  };

  return (
    <div className="relative flex justify-end">
      <div className="relative">
        {/* 버튼 */}
        <button
          onClick={() => {
            increaseTreeSize();
            setFade(true);
            setShowTooltip(false);
          }}
          onMouseEnter={() => {
            setShowTooltip(true); // 보이게
            setFade(false); // opacity 1
          }}
          onMouseLeave={() => {
            // 1초 후 fade-out
            setTimeout(() => setFade(true), 1000);
          }}
          className="bg-green text-beige font-button flex items-center rounded-full p-2"
        >
          <Plus size={24} strokeWidth={3} />
        </button>

        {(owner.treeSize ?? 0) <= 10 && (
          <div
            className={`text-beige absolute top-full right-0 mt-2 rounded-lg bg-[#ff4800] px-4 py-2 whitespace-nowrap shadow-lg transition-opacity duration-500 ${fade ? "pointer-events-none opacity-0" : "opacity-100"} `}
          >
            {/* triangle */}
            <div className="absolute -top-1.5 right-3 h-0 w-0 border-r-8 border-b-8 border-l-8 border-r-transparent border-b-[#ff4800] border-l-transparent" />
            트리를 추가해보세요!
          </div>
        )}
      </div>
    </div>
  );
}
