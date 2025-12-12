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
  const [year, month, day] = ornament.createdDate.split(".");

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center gap-6">
        <div className="bg-muted-bg relative flex size-30 items-center justify-center rounded-full">
          <div className="h-20 w-20 overflow-hidden rounded-full">
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
          <p className="text-body text-green font-bold">방문자</p>
          <h3 className="text-heading text-fg-primary">
            {ornament.writerNickname}님
          </h3>
          <p className="text-caption text-muted-navy pt-1">
            {year}년 {month}월 {day}일에 장식을 등록하였습니다.
          </p>
        </div>
      </div>

      <div className="flex w-full flex-col gap-2">
        <ActionButton onClick={onClose}>확인</ActionButton>
      </div>
    </BottomSheet>
  );
}
