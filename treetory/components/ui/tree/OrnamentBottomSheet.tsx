import { BottomSheetProps } from "@/types/ui";
import type { Ornarment } from "@/types/ornarment";
import { BottomSheet } from "@/components/commons/BottomSheet";
import Image from "next/image";
import { ActionButton } from "@/components/commons/Button";

type OrnamentBottomSheetProps = BottomSheetProps & {
  ornament: Ornarment | null;
};

export default function OrnamentBottomSheet({
  isOpen,
  onClose,
  ornament,
}: OrnamentBottomSheetProps) {
  if (!ornament) return null;

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center gap-6">
        <div className="relative flex items-center justify-center rounded-full bg-muted-bg size-30">
          <div className="w-20 h-20 overflow-hidden rounded-full">
            <Image
              alt="선택된 장식 이미지"
              src={ornament.imgUrl}
              width={80}
              height={80}
              className="object-cover"
            />
          </div>
        </div>
        <div className="flex flex-col items-center">
          <p className="font-bold text-body text-green">방문자</p>
          <h3 className="text-heading text-fg-primary">
            {ornament.writerNickname}님
          </h3>
          <p className="pt-1 text-caption text-muted-navy">
            {ornament.createdDate}에 장식을 등록하였습니다.
          </p>
        </div>
      </div>

      <div className="flex flex-col w-full gap-2">
        <ActionButton onClick={onClose}>확인</ActionButton>
      </div>
    </BottomSheet>
  );
}
