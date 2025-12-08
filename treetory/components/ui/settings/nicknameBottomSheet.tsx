import { BottomSheet } from "@/components/commons/BottomSheet";
import { BottomSheetProps } from "@/types/ui";
import { CancleButton } from "@/components/commons/Button";

export default function NicknameBottomSheet({
  isOpen,
  onClose,
}: BottomSheetProps) {
  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <h3 className="text-subtitle md:text-title text-primary">
        닉네임 <span className="text-green">변경</span>
      </h3>
      <CancleButton onClick={onClose} />
    </BottomSheet>
  );
}
