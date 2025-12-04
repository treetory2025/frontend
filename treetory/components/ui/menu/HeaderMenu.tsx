import { MenuItem } from "@/components/ui/menu/MunuItem";

import { MoveRight } from "lucide-react";
import { Copy } from "lucide-react";
import { LogIn } from "lucide-react";
import { Search } from "lucide-react";
export default function HeaderMenu() {
  return (
    <div className="text-fg-primary flex w-full flex-col gap-1 px-2">
      {/* On Click 연결 안됨 */}
      <MenuItem label="설정" icon={MoveRight} />
      <MenuItem label="초대링크 복사하기" icon={Copy} />
      <MenuItem label="로그인" icon={LogIn} />
      <div className="border-green w-full border-t" />
      <MenuItem label="나의 트리토리 이동" icon={MoveRight} />
      <div className="border-green w-full border-t" />
      <MenuItem label="즐겨찾기" icon={MoveRight} />
      <MenuItem label="사용자 검색" icon={Search} />
    </div>
  );
}
