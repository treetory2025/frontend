import { Ornarment } from "@/types/ornarment";
import Image from "next/image";

export default function MyOrnaments({ ornaments }: { ornaments: Ornarment[] }) {
  return (
    <div className="flex flex-col gap-4 px-4">
      {ornaments.map((o) => {
        const [year, month, date] = o.createdDate.split(".");

        return (
          <div
            key={o.placedOrnamentId}
            className="flex w-full items-center justify-between"
          >
            <div className="flex items-center gap-8">
              <div className="bg-muted-bg size-18 rounded-full p-3">
                <Image
                  src={o.imgUrl}
                  alt={`등록된 장식 이미지 ${o.placedOrnamentId}`}
                  width={72}
                  height={72}
                  className="rounded-full object-cover"
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
