import { AnimatePresence, motion } from "motion/react";
import type { BottomSheetProps } from "@/types/ui";
import { useUserStore } from "@/store/userStore";
import { useBottomSheet } from "@/hooks/useBottomSheet";
import { useEffect } from "react";

import Image from "next/image";
import ornament1 from "@/public/images/common/ornament1.png";
import ornament2 from "@/public/images/common/ornament2.png";
import ornament3 from "@/public/images/common/ornament3.png";

export function BottomSheet({
  isOpen,
  onClose,
  children,
  className,
}: BottomSheetProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-black/40"
            onClick={onClose}
          />

          <motion.div
            className={`${className} bg-beige fixed bottom-0 left-0 z-50 flex w-full flex-col items-center justify-center gap-9 rounded-t-xl p-8 pb-16 md:left-1/2 md:w-[45dvw] md:min-w-[640px] md:-translate-x-1/2 md:px-12`}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

type WelcomeBottomSheetProps = {
  isOwner: boolean;
};
export function WelcomeBottomSheet({ isOwner }: WelcomeBottomSheetProps) {
  const user = useUserStore((s) => s.user);

  const { isOpen, open, close } = useBottomSheet();
  useEffect(() => {
    if (!isOwner) return;
    open();
  }, [isOwner]);

  const items = [
    { img: ornament1, size: 20 },
    { img: ornament2, size: 12 },
    { img: ornament3, size: 16 },
  ];
  const variants: {} = {
    hidden: {
      opacity: 0.2,
      y: 15,
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 1,
        repeat: Infinity,
        repeatType: "reverse",
      },
    }),
  };

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={close}
      className="flex flex-col items-center justify-center select-none"
    >
      <div className="border-green flex w-full flex-col items-center gap-1 border-b-2 pb-4">
        <h3 className="text-body text-green flex text-lg font-bold">
          나의 트리 방문
        </h3>
      </div>
      <div className="wrap flex flex-col items-center justify-center gap-4">
        <ul className="bg-green flex items-center gap-6 rounded-md px-3 py-6">
          {items.map((item, i) => (
            <motion.li
              key={i}
              initial="hidden"
              animate="visible"
              variants={variants}
              custom={i}
            >
              <Image
                src={item.img}
                alt={`장식이미지${i}`}
                className={`size-${item.size}`}
              />
            </motion.li>
          ))}
        </ul>

        <h3 className="text-body text-fg-secondary text-center">
          설레는 마음으로, 장식들과 함께
          <br />
          <span className="text-green font-bold"> {user?.nickname}님</span>을
          기다리고 있었어요!
        </h3>
      </div>
    </BottomSheet>
  );
}
