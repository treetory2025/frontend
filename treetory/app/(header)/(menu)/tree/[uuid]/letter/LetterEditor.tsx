"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowBigDown, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getTreeOwner, getTreeOwnerInLetter } from "@/lib/api";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import styles from "./letter.module.css";

interface Props {
  uuid: string;
  searchParams?: { [key: string]: string | string[] | undefined };
}

const fontOptions = [
  { key: "NANUM_PEN", label: "나눔손글씨체", className: styles.fontNanumPen },
  {
    key: "GANGWON_EDUCATION_SAEUM",
    label: "강원교육새음체",
    className: styles.fontGangwon,
  },
  {
    key: "ONGLEIP_WISH_LIST",
    label: "온글잎위시리스트체",
    className: styles.fontOngleipWish,
  },
  {
    key: "ONGLEIP_TTEROM",
    label: "온글잎때롬체",
    className: styles.fontOngleipTterom,
  },
  { key: "KOTRA_HOPE", label: "코트라희망체", className: styles.fontKotraHope },
];

const fontFamilyMap: Record<string, string> = {
  NANUM_PEN: "'Nanum Pen Script', cursive",
  GANGWON_EDUCATION_SAEUM: "'GangwonEducationSaeum', sans-serif",
  ONGLEIP_WISH_LIST: "'OngleipWFontList', sans-serif",
  ONGLEIP_TTEROM: "'OngleipTterom', sans-serif",
  KOTRA_HOPE: "'KotraHope', sans-serif",
};

export default function LetterEditor({ uuid, searchParams }: Props) {
  const params = useParams();
  const router = useRouter();
  const sp = useSearchParams();

  const treeUuid = params.uuid; // 트리 소유자 uuid
  const imgUrl = (searchParams?.imgUrl as string) || (sp?.get("imgUrl") ?? "");
  const nickname =
    (searchParams?.nickname as string) || (sp?.get("nickname") ?? "");
  const ornamentId =
    (searchParams?.ornamentId as string) || (sp?.get("ornamentId") ?? "");

  const [text, setText] = useState("");
  const [isFontOpen, setIsFontOpen] = useState(false);
  const [selectedFont, setSelectedFont] = useState("NANUM_PEN");
  const [showPreview, setShowPreview] = useState(false);
  const modalContentRef = useRef<HTMLDivElement | null>(null);
  const [ownerNickname, setOwnerNickname] = useState<string | null>(null);

  const lineHeight = 36; // px between lines
  const topPadding = 136; // px: distance from top of paper to first line
  const linesBackground = `repeating-linear-gradient(to bottom, transparent 0px, transparent ${lineHeight - 1}px, rgba(0,0,0,0.08) ${lineHeight - 1}px, rgba(0,0,0,0.08) ${lineHeight}px)`;

  const canPush = text.length > 0;
  const size =
    text.length > 100 ? "MEDIUM" : text.length > 200 ? "LARGE" : "SMALL";

  useEffect(() => {
    // optional: prefill or other init
  }, []);

  useEffect(() => {
    // load tree owner nickname when uuid available
    if (!uuid) return;
    console.log("fetching owner nickname for uuid:", uuid);
    (async () => {
      try {
        const owner = await getTreeOwnerInLetter(uuid);
        // backend may return nickname under different keys
        const nick =
          owner?.nickname ?? owner?.userNickname ?? owner?.nick ?? null;
        console.log("owner nickname fetch", nick);
        setOwnerNickname(nick);
      } catch (e) {
        console.error("owner fetch error", e);
      }
    })();
  }, [uuid]);

  const today = new Date();
  const formattedDate = new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  }).format(today);

  // ornament preview size based on current text length
  const ornamentSize = text.length <= 100 ? 44 : text.length <= 200 ? 60 : 76;

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="relative px-4 py-2">
        <div className="flex items-center gap-3">
          <p
            className="text-md text-green font-lightbold m-0"
            style={{ fontFamily: fontFamilyMap[selectedFont] }}
          >
            {fontOptions.find((f) => f.key === selectedFont)?.label}로 편지를
            쓰고 있습니다
          </p>

          <button
            type="button"
            onClick={() => setIsFontOpen((prev) => !prev)}
            className="font-base flex items-center gap-1 text-sm text-white"
          >
            <span>변경하기</span>
            <ArrowBigDown size={16} strokeWidth={2.5} />
          </button>
        </div>
        <div className="absolute top-[-32px] right-4 z-50">
          <div
            role="button"
            tabIndex={0}
            onClick={() => setShowPreview(true)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setShowPreview(true);
            }}
            className="relative cursor-pointer"
          >
            <div className="bg-skyblue flex h-20 w-20 items-center justify-center rounded-full border-6 border-white shadow-md">
              <img
                src="/icons/snowman.png"
                alt="snowman"
                className="mt-10 h-12 w-12"
              />
            </div>
            <div className="font-base absolute -top-3 right-0 rounded bg-red-400 px-2 py-1 text-xs text-white">
              장식 확인!
            </div>
          </div>
        </div>

        {/* 드롭다운 (framer-motion) */}
        <AnimatePresence>
          {isFontOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="border-green absolute z-10 mt-2 ml-28 w-48 origin-top rounded-md border-2 bg-white shadow"
            >
              {fontOptions.map((option) => (
                <button
                  key={option.key}
                  type="button"
                  onClick={() => {
                    setSelectedFont(option.key);
                    setIsFontOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                  style={{ fontFamily: fontFamilyMap[option.key] }}
                >
                  {option.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* Preview modal triggered by snowman */}
      {showPreview && (
        <div className="fixed inset-0 z-40 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowPreview(false)}
          />
          <div
            ref={modalContentRef}
            className="relative z-50 w-11/12 max-w-md overflow-hidden rounded-xl border-4 border-white bg-white shadow-lg"
          >
            <div className="bg-sky-200 py-3 text-center font-medium text-sky-800">
              미리보기
            </div>
            <div className="flex w-full flex-col items-center justify-center">
              <div
                className="border-green relative h-64 w-full border-t-4 border-b-4 bg-[#0f3b5a]"
                style={{
                  backgroundImage: `url('/images/tree_login2.png')`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  backgroundSize: "contain",
                }}
              >
                {imgUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={imgUrl}
                    alt="preview"
                    style={{ width: ornamentSize, height: ornamentSize }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-cover"
                  />
                ) : (
                  <div
                    className="bg-beige absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                    style={{ width: ornamentSize, height: ornamentSize }}
                  />
                )}
              </div>
            </div>
            <div className="bg-slate-100 p-4">
              <button
                type="button"
                onClick={() => setShowPreview(false)}
                className="w-full rounded bg-slate-400 py-2 text-white"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
      <div
        className="relative flex w-full flex-col overflow-hidden bg-white shadow"
        style={{
          backgroundImage: `url('/images/letter.png')`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center top",
          backgroundSize: "cover",
          minHeight: 680,
        }}
      >
        {/* ornament + to */}
        <div className="absolute top-24 left-12 flex items-center gap-3">
          <div
            className="text-muted text-3xl"
            style={{ fontFamily: fontFamilyMap["NANUM_PEN"] }}
          >
            Dear. {nickname || "받는 사람"}
          </div>
        </div>

        {/* 현재 글자수 */}
        <div className="absolute top-16 right-4 flex items-center gap-3">
          <div className="text-muted-navy text-sm">
            현재 글자수&nbsp; {text.length}/300
          </div>
        </div>

        {/* transparent textarea positioned to match letter lines */}
        <div className="flex-1 px-6" style={{ paddingTop: topPadding }}>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={12}
            placeholder={"마음을 담아 편지를 작성해주세요."}
            maxLength={300}
            className={`w-full resize-y bg-transparent text-base text-xl outline-none`}
            style={{
              lineHeight: `${lineHeight}px`,
              resize: "none",
              backgroundImage: linesBackground,
              backgroundRepeat: "repeat",
              backgroundAttachment: "local",
              backgroundPosition: `left ${topPadding}px`,
              padding: 0,
              minHeight: `${lineHeight * 12}px`,
              fontFamily: fontFamilyMap[selectedFont],
            }}
          />
        </div>

        {/* footer row: 작성일 (left) and From (right) */}
        <div className="mb-12 flex w-full items-center justify-between px-6">
          <div className="flex flex-col items-start gap-3">
            <div className="mt-10 text-sm text-gray-600">
              작성일 {formattedDate}
            </div>
            {/* 작성 완료 버튼 추가 */}
            <button
              className={`text-subtitle text-green flex items-center gap-2 ${canPush ? "cursor-pointer" : "cursor-not-allowed opacity-30"}`}
              disabled={!canPush}
              onClick={() =>
                router.push(
                  `/tree/${treeUuid}/decorate/placement?` +
                    new URLSearchParams({
                      imgUrl,
                      nickname,
                      ornamentId,
                      text,
                      size,
                      font: selectedFont,
                    }).toString(),
                )
              }
            >
              작성 완료
              <ChevronRight size={24} strokeWidth={3} className="mb-0.5" />
            </button>
          </div>
          <div className={`text-3xl ${styles.fontNanumPen}`}>
            From. {ownerNickname ?? "내가누구"}
          </div>
        </div>
      </div>
    </div>
  );
}
