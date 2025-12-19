import { useAlert } from "@/hooks/useAlert";
import { isLoggedIn } from "@/lib/auth";
import { Plus } from "lucide-react";
import { useRouter, useParams } from "next/navigation";

export default function CreateOrnamentButton() {
  const router = useRouter();
  const params = useParams();
  const uuid = params?.uuid as string;
  const loggedin = isLoggedIn();
  const alert = useAlert();

  const handleCreateOrnament = () => {
    if (!loggedin) {
      alert("로그인이 필요합니다.");
      return;
    }
    // 장식 만들기 페이지로 이동
    router.push(`/tree/${uuid}/decorate/create`);
  };

  return (
    <button
      onClick={handleCreateOrnament}
      className="bg-green text-beige flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1 font-semibold transition-all duration-200 hover:scale-105 hover:opacity-90 md:px-4 md:py-2"
    >
      <Plus className="size-5 md:size-6" />
      <span className="text-button md:text-body select-none">장식 만들기</span>
    </button>
  );
}
