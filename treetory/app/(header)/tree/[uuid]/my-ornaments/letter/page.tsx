"use client";

import { isChristmas2025InKorea } from "@/lib/date";
import { useOwner } from "../../tree-context";
import { isUser } from "@/lib/auth";
import { useAlert } from "@/hooks/useAlert";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "@/app/(header)/(menu)/tree/[uuid]/letter/letter.module.css";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import PageHeading from "@/components/commons/PageHeading";

const fontOptions = [
  { key: "NANUM_PEN", className: styles.fontNanumPen },
  {
    key: "GANGWON_EDUCATION_SAEUM",
    className: styles.fontGangwon,
  },
  {
    key: "ONGLEIP_WISH_LIST",
    className: styles.fontOngleipWish,
  },
  {
    key: "ONGLEIP_TTEROM",
    className: styles.fontOngleipTterom,
  },
  { key: "KOTRA_HOPE", className: styles.fontKotraHope },
];

const fontFamilyMap: Record<string, string> = {
  NANUM_PEN: "'Nanum Pen Script', cursive",
  GANGWON_EDUCATION_SAEUM: "'GangwonEducationSaeum', sans-serif",
  ONGLEIP_WISH_LIST: "'OngleipWFontList', sans-serif",
  ONGLEIP_TTEROM: "'OngleipTterom', sans-serif",
  KOTRA_HOPE: "'KotraHope', sans-serif",
};
export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const placedOrnamentId = searchParams.get("placedOrnamentId");
  const { owner, uuid } = useOwner();
  const isOwner = owner ? isUser() : false;

  const [font, setFont] = useState("NANUM_PEN");
  const [writer, setWriter] = useState("");
  const [message, setMessage] = useState(
    "이름 푸하하\n    이름 푸하하\n이름 ~ 푸하하하",
  );
  const [createdDate, setCreatedDate] = useState("");
  const [year, month, day] = createdDate.split(".");

  const alert = useAlert();

  useEffect(() => {
    if (!owner || !isOwner || !placedOrnamentId) return;

    async function getLetter() {
      try {
        const res = await apiFetch(`/api/trees/messages/${placedOrnamentId}`);
        if (res.ok) {
          const data = await res.json();
          setFont(data.body.font);
          setWriter(data.body.writer);
          setMessage(data.body.message);
          setCreatedDate(data.body.createdDate);
          return;
        }

        // 편지 조회 결과 확인
        if (res.status === 403) {
          // 크리스마스 이전이거나, 편지 권한 없음
          alert(
            "편지를 조회할 수 없습니다.\n트리 소유자가 크리스마스 이후에\n조회할 수 있습니다.",
            () => router.back(),
          );
          return;
        } else {
          console.error("편지 api 실패", res);
          throw new Error();
        }
      } catch (error) {
        console.error("편지 불러오기 실패", error);
      }
    }

    getLetter();
  }, [owner, uuid, isOwner, placedOrnamentId]);

  const lineHeight = 36; // 줄 간격(px)
  const topPadding = 136; // 첫 줄 시작 위치(px)

  const linesBackground = `repeating-linear-gradient(
  to bottom,
  transparent 0px,
  transparent ${lineHeight - 1}px,
  rgba(0,0,0,0.08) ${lineHeight - 1}px,
  rgba(0,0,0,0.08) ${lineHeight}px
)`;

  return (
    <>
      <PageHeading title="작성된 편지" />
      {/* 편지 조회 출력 */}
      <div className="no-scrollbar h-dvh overflow-y-auto pb-60">
        <div
          className="relative flex w-full flex-col bg-white shadow"
          style={{
            backgroundImage: `url('/images/letter.png')`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center top",
            backgroundSize: "cover",
            minHeight: 720,
          }}
        >
          {/* 받는 사람 */}
          <div className="absolute top-24 left-12">
            <p
              className={`text-navy w-full pr-6 text-right text-3xl whitespace-pre-line ${styles.fontNanumPen}`}
            >
              Dear. {owner?.nickname ?? "받는 사람"}
            </p>
          </div>

          {/* 편지 본문 (읽기 전용) */}
          <div
            className="h-full flex-1 px-6"
            style={{ paddingTop: topPadding }}
          >
            <textarea
              value={message}
              readOnly
              tabIndex={-1}
              rows={12}
              className={`w-full cursor-default resize-y bg-transparent text-xl outline-none`}
              style={{
                lineHeight: `${lineHeight}px`,
                resize: "none",
                backgroundImage: linesBackground,
                backgroundRepeat: "repeat",
                backgroundAttachment: "local",
                backgroundPosition: `left ${topPadding}px`,
                backgroundSize: "contain",
                padding: 0,
                minHeight: `${lineHeight * 12}px`,
                fontFamily: fontFamilyMap[font],
              }}
            />
          </div>

          {/* 작성자 */}
          <div
            className={`text-navy w-full pr-6 text-right text-3xl whitespace-pre-line ${styles.fontNanumPen}`}
          >
            From. {writer || "알 수 없음"}
          </div>

          {/* 작성일 */}
          <div className="mb-12 px-6">
            <p className="text-muted-navy text-sm font-bold">작성일</p>
            <p className="text-muted-navy text-sm">
              {year}년 {month}월 {day}일
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
