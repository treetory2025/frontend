import { MenuItem } from "@/components/ui/menu/MunuItem";

import { MoveRight } from "lucide-react";
import { Copy } from "lucide-react";
import { LogIn } from "lucide-react";
import { Search } from "lucide-react";

import { useRouter } from "next/navigation";

export default function HeaderMenu({ onClose }: { onClose: () => void }) {
  const router = useRouter();

  const menus = [
    {
      label: "설정",
      icon: MoveRight,
      onClick: () => {
        router.push("/settings");
        onClose();
      },
    },
    {
      label: "초대링크 복사하기",
      icon: Copy,
      onClick: () => {
        navigator.clipboard.writeText(window.location.href);
        console.log("초대링크 복사");
        onClose();
      },
    },
    {
      label: "로그인",
      icon: LogIn,
      onClick: () => {
        console.log("로그인 페이지 이동");
        onClose();
      },
    },
    { divider: true, label: "", icon: () => null },
    {
      label: "나의 트리토리 이동",
      icon: MoveRight,
      onClick: () => {
        console.log("나의 트리토리 이동");
      },
    },
    { divider: true, label: "", icon: () => null },
    {
      label: "즐겨찾기",
      icon: MoveRight,
      onClick: () => {
        router.push("/bookmarks");

        onClose();
      },
    },
    {
      label: "사용자 검색",
      icon: Search,
      onClick: () => {
        console.log("사용자검색 페이지 이동");
        onClose();
      },
    },
  ];

  return (
    <div className="text-fg-primary flex w-full flex-col gap-1 px-2">
      {menus.map((item, idx) =>
        item.divider ? (
          <div key={idx} className="border-green w-full border-t" />
        ) : (
          <MenuItem key={item.label} {...item} />
        ),
      )}
    </div>
  );
}
