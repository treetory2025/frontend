import { Plus } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';

export default function CreateOrnamentButton() {
  const router = useRouter();
  const params = useParams();
  const uuid = params?.uuid as string;

  const handleCreateOrnament = () => {
    // 장식 만들기 페이지로 이동
    router.push(`/tree/${uuid}/decorate/create`);
  };

  return (
    <button
      onClick={handleCreateOrnament}
      className="flex items-center gap-2 rounded-lg bg-green px-6 py-3 font-semibold text-beige transition-all duration-200 hover:opacity-90 hover:scale-105 md:px-8 md:py-4"
    >
      <Plus className="size-5 md:size-6" />
      <span className="text-button md:text-body">장식 만들기</span>
    </button>
  );
}
