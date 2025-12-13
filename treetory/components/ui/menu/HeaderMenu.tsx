import { MenuItem } from "@/components/ui/menu/MunuItem";

import { MoveRight, Copy, LogIn, LogOut, Search } from "lucide-react";

import { useRouter } from "next/navigation";
import { isLoggedIn } from "@/lib/auth";
import { useUserStore } from "@/store/userStore";
import { useMemberSearchSheet } from "@/store/useMemberSearchSheet";

type Menu =
  | {
      label: string;
      icon: any;
      onClick?: () => void;
      disabled?: boolean;
    }
  | {
      divider: true;
    };

export default function HeaderMenu({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const loggedIn = isLoggedIn();
  const user = useUserStore((s) => s.user);
  const clearUser = useUserStore((s) => s.clearUser);

  const open = useMemberSearchSheet((s) => s.open);

  const menus: Menu[] = [
    {
      label: "설정",
      icon: MoveRight,
      disabled: !loggedIn,
      onClick: () => {
        if (!loggedIn) {
          alert("로그인이 필요합니다.");
          return;
        }
        router.push("/settings");
        onClose();
      },
    },
    {
      label: "초대링크 복사하기",
      icon: Copy,
      disabled: !loggedIn,
      onClick: () => {
        if (!loggedIn) {
          alert("로그인이 필요합니다.");
          return;
        }
        navigator.clipboard.writeText(window.location.href);
        onClose();
      },
    },

    // 로그인 / 로그아웃 스위칭
    loggedIn
      ? {
          label: "로그아웃",
          icon: LogOut,
          onClick: async () => {
            console.log("로그아웃 처리");
            try {
              const res = await fetch(`/api/auth/logout`, {
                method: "POST",
                credentials: "include",
              });

              if (!res.ok) {
                console.log("로그아웃 요청 실패", res);
                onClose();
                return;
              }

              clearUser();
              // 해당 페이지 새로고침
              router.refresh();
              onClose();
            } catch (error) {
              console.error("api 오류", error);
              onClose();
            }
          },
        }
      : {
          label: "로그인",
          icon: LogIn,
          onClick: () => {
            // 로그인 페이지 이동
            router.push("/login");
            onClose();
          },
        },

    { divider: true },

    {
      label: "나의 트리토리 이동",
      icon: MoveRight,
      disabled: !loggedIn,
      onClick: () => {
        if (!loggedIn) {
          alert("로그인이 필요합니다.");
          return;
        }

        if (!user) {
          console.log("유저 인식 실패");
          return;
        }
        router.push(`/tree/${user.uuid}`);
        onClose();
      },
    },

    { divider: true },

    {
      label: "즐겨찾기",
      icon: MoveRight,
      disabled: !loggedIn,
      onClick: () => {
        if (!loggedIn) {
          alert("로그인이 필요합니다.");
          return;
        }
        router.push("/bookmarks");
        onClose();
      },
    },
    {
      label: "사용자 검색",
      icon: Search,
      onClick: () => {
        open();
        onClose();
      },
    },
  ];

  console.log(isLoggedIn());

  return (
    <div className="text-fg-primary flex w-full flex-col gap-1 px-2">
      {menus.map((item, idx) =>
        "divider" in item ? (
          <div key={idx} className="border-green w-full border-t" />
        ) : (
          <MenuItem
            key={item.label}
            {...item}
            className={
              item.disabled ? "cursor-not-allowed opacity-30" : "cursor-pointer"
            }
          />
        ),
      )}
    </div>
  );
}
