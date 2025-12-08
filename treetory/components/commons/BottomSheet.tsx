import { AnimatePresence, motion } from "motion/react";
import type { BottomSheetProps } from "@/types/ui";

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
            className={`${className} bg-beige fixed bottom-0 left-0 z-50 flex w-full flex-col items-center justify-center gap-9 rounded-t-xl p-8 md:left-1/2 md:w-[50dvw] md:min-w-[640px] md:-translate-x-1/2 md:px-12`}
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
