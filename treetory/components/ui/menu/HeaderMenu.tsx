import { MenuItem } from "@/components/ui/menu/MunuItem";

import { MoveRight, Copy, LogIn, LogOut, Search, Star } from "lucide-react";

import { useParams, useRouter } from "next/navigation";
import { isLoggedIn } from "@/lib/auth";
import { useUserStore } from "@/store/userStore";
import { useMemberSearchSheet } from "@/store/useMemberSearchSheet";
import { useAlert, useInviteAlert } from "@/hooks/useAlert";

import { motion, AnimatePresence } from "framer-motion";

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

  const alert = useAlert();
  const inviteAlert = useInviteAlert();

  const open = useMemberSearchSheet((s) => s.open);

  const menus: Menu[] = [
    {
      label: "설정",
      icon: MoveRight,
      disabled: !loggedIn,
      onClick: () => {
        if (!loggedIn) {
          onClose();
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
          onClose();
          alert("로그인이 필요합니다.");
          return;
        }
        onClose();
        inviteAlert();
      },
    },

    // 로그인 / 로그아웃 스위칭
    loggedIn
      ? {
          label: "로그아웃",
          icon: LogOut,
          onClick: async () => {
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

              onClose();
              clearUser();
              alert("로그아웃되었습니다.");
              // 해당 페이지 새로고침
              router.refresh();
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
            onClose();
            router.push("/login");
          },
        },

    { divider: true },

    {
      label: "나의 트리토리 이동",
      icon: MoveRight,
      disabled: !loggedIn,
      onClick: () => {
        if (!loggedIn) {
          onClose();
          alert("로그인이 필요합니다.");
          return;
        }

        if (!user) {
          console.log("유저 인식 실패");
          onClose();

          return;
        }

        const params = useParams();
        const currentUuid = params?.uuid;
        onClose();

        if (currentUuid === user.uuid) {
          alert("현재 나의 트리토리입니다.");
          return;
        }

        router.push(`/tree/${user.uuid}`);
      },
    },

    { divider: true },

    {
      label: "즐겨찾기",
      icon: Star,
      disabled: !loggedIn,
      onClick: () => {
        if (!loggedIn) {
          onClose();
          alert("로그인이 필요합니다.");
          return;
        }

        onClose();
        router.push("/bookmarks");
      },
    },
    {
      label: "사용자 검색",
      icon: Search,
      onClick: () => {
        onClose();
        open();
      },
    },
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-fg-primary flex w-full flex-col gap-1 px-2"
      >
        {menus.map((item, idx) =>
          "divider" in item ? (
            <div key={idx} className="border-green w-full border-t" />
          ) : (
            <MenuItem
              key={item.label}
              {...item}
              className={
                item.disabled
                  ? "cursor-not-allowed opacity-30"
                  : "cursor-pointer"
              }
            />
          ),
        )}
      </motion.div>
    </AnimatePresence>
  );
}
