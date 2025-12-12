import { BottomSheetProps } from "@/types/ui";
import type { Ornarment } from "@/types/ornarment";
import { BottomSheet } from "@/components/commons/BottomSheet";

export default function OrnamentBottomSheet({
  isOpen,
  onClose,
  ornament,
}: BottomSheetProps & { ornament: Ornarment | null }) {
  if (!ornament) return null;
  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      장식 조회 성공
      {ornament.ornamentId}
    </BottomSheet>
  );
}
