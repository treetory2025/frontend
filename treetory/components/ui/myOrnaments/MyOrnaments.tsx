import { Ornarment } from "@/types/ornarment";
import Image from "next/image";
import useImage from "use-image";

export default function MyOrnaments({ ornaments }: { ornaments: Ornarment[] }) {
  return (
    <div className="no-scrollbar my-4 flex h-full flex-1 flex-col gap-4 overflow-y-auto px-4 py-2">
      {ornaments.map((o) => {
        const [ornamentImg] = useImage(o.imgUrl);
        if (!ornamentImg) return;

        const [year, month, date] = o.createdDate.split(".");
        return (
          <div
            key={o.placedOrnamentId}
            className="flex w-full items-center justify-between"
          >
            <div className="flex items-center justify-center gap-8">
              <div className="bg-muted-bg size-20 rounded-full p-4">
                <Image
                  src={ornamentImg}
                  alt={`등록된 장식 이미지 ${o.placedOrnamentId}`}
                />
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-body text-navy font-bold">
                  {o.writerNickname}
                </p>
                <p className="text-caption text-muted-navy">
                  {year}년 {month}월 {date}일
                </p>
              </div>
            </div>
            <button className="bg-muted-navy text-beige text-caption rounded-full px-4 py-2">
              자세히
            </button>
          </div>
        );
      })}
    </div>
  );
}
