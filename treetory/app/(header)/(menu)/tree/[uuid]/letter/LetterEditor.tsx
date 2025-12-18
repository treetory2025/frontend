"use client"

import React, { useState, useEffect, useRef } from 'react'
import { getTreeOwner, getTreeOwnerInLetter } from '@/lib/api'
import { useRouter, useSearchParams } from 'next/navigation'
import styles from './letter.module.css'

interface Props {
  uuid: string
  searchParams?: { [key: string]: string | string[] | undefined }
}

const fontOptions = [
  { key: 'NANUM_PEN', label: '나눔손글씨체', className: styles.fontNanumPen },
  { key: 'GANGWON_EDUCATION_SAEUM', label: '강원교육새음체', className: styles.fontGangwon },
  { key: 'ONGLEIP_WISH_LIST', label: '온글잎위시리스트체', className: styles.fontOngleipWish },
  { key: 'ONGLEIP_TTEROM', label: '온글잎때롬체', className: styles.fontOngleipTterom },
  { key: 'KOTRA_HOPE', label: '코트라희망체', className: styles.fontKotraHope },
]

const fontFamilyMap: Record<string, string> = {
  NANUM_PEN: "'Nanum Pen Script', cursive",
  GANGWON_EDUCATION_SAEUM: "'GangwonEducationSaeum', sans-serif",
  ONGLEIP_WISH_LIST: "'OngleipWFontList', sans-serif",
  ONGLEIP_TTEROM: "'OngleipTterom', sans-serif",
  KOTRA_HOPE: "'KotraHope', sans-serif",
}

export default function LetterEditor({ uuid, searchParams }: Props) {
  const router = useRouter()
  const sp = useSearchParams()
  const imgUrl = (searchParams?.imgUrl as string) || (sp?.get('imgUrl') ?? '')
  const nickname = (searchParams?.nickname as string) || (sp?.get('nickname') ?? '')
  const ornamentId = (searchParams?.ornamentId as string) || (sp?.get('ornamentId') ?? '')
  
  const [text, setText] = useState('')
  const [isFontOpen, setIsFontOpen] = useState(false)
  const [selectedFont, setSelectedFont] = useState('NANUM_PEN')
  const [showPreview, setShowPreview] = useState(false)
  const modalContentRef = useRef<HTMLDivElement | null>(null)
  const [ownerNickname, setOwnerNickname] = useState<string | null>(null)

  const lineHeight = 36 // px between lines
  const topPadding = 136 // px: distance from top of paper to first line
  const linesBackground = `repeating-linear-gradient(to bottom, transparent 0px, transparent ${lineHeight - 1}px, rgba(0,0,0,0.08) ${lineHeight - 1}px, rgba(0,0,0,0.08) ${lineHeight}px)`

  useEffect(() => {
    // optional: prefill or other init
  }, [])

  useEffect(() => {
    // load tree owner nickname when uuid available
    if (!uuid) return
    console.log('fetching owner nickname for uuid:', uuid)
    ;(async () => {
      try {
        const owner = await getTreeOwnerInLetter(uuid)
        // backend may return nickname under different keys
        const nick = owner?.nickname ?? owner?.userNickname ?? owner?.nick ?? null
        console.log('owner nickname fetch', nick)
        setOwnerNickname(nick)
      } catch (e) {
        console.error('owner fetch error', e)
      }
    })()
  }, [uuid])

  const today = new Date()
  const formattedDate = new Intl.DateTimeFormat('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' }).format(today)

  // ornament preview size based on current text length
  const ornamentSize = text.length <= 100 ? 44 : text.length <= 200 ? 60 : 76

  return (
    <div className="max-w-md mt-6">
        <div className="px-4 py-2 relative">
            <div className="flex items-center gap-3">
                <p className="text-md text-green font-lightbold m-0" style={{ fontFamily: fontFamilyMap[selectedFont] }}>
                {fontOptions.find(f => f.key === selectedFont)?.label}로 편지를 쓰고 있습니다
                </p>

                <button
                type="button"
                onClick={() => setIsFontOpen(prev => !prev)}
                className="text-sm text-white font-base underline"
                >
                변경하기 ↓
                </button>
            </div>
            <div className="absolute ml-84 top-1/100 -translate-y-1/2 z-50">
              <div
                role="button"
                tabIndex={0}
                onClick={() => setShowPreview(true)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setShowPreview(true) }}
                className="relative cursor-pointer"
              >
                <div className="w-20 h-20 rounded-full bg-skyblue flex items-center justify-center border-6 border-white shadow-md">
                  <img src="/icons/snowman.png" alt="snowman" className="w-12 h-12 mt-10" />
                </div>
                <div className="absolute -top-3 right-0 bg-red-400 text-white text-xs font-base px-2 py-1 rounded">
                  장식 확인!
                </div>
              </div>
            </div>

            {/* 드롭다운 */}
            {isFontOpen && (
                <div className="absolute mt-2 bg-white border-green border-2 rounded-md shadow w-48 z-10">
                {fontOptions.map(option => (
                    <button
                    key={option.key}
                    type="button"
                    onClick={() => {
                        setSelectedFont(option.key)
                        setIsFontOpen(false)
                    }}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    style={{ fontFamily: fontFamilyMap[option.key] }}
                    >
                    {option.label}
                    </button>
                ))}
                </div>
            )}
        </div>
        {/* Preview modal triggered by snowman */}
        {showPreview && (
          <div className="fixed inset-0 z-40 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/40" onClick={() => setShowPreview(false)} />
            <div ref={modalContentRef} className="relative z-50 w-11/12 max-w-md bg-white rounded-xl border-4 border-white overflow-hidden shadow-lg">
              <div className="text-center bg-sky-200 text-sky-800 py-3 font-medium">미리보기</div>
              <div className="w-full flex flex-col items-center justify-center">
                <div
                  className="w-full h-64 relative bg-[#0f3b5a] border-t-4 border-b-4 border-green"
                  style={{
                    backgroundImage: `url('/images/tree_login2.png')`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'contain',
                  }}
                >
                  {imgUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={imgUrl}
                      alt="preview"
                      style={{ width: ornamentSize, height: ornamentSize }}
                      className="absolute left-1/2 top-1/2 object-cover -translate-x-1/2 -translate-y-1/2"
                    />
                  ) : (
                    <div className="absolute left-1/2 top-1/2 rounded-full bg-beige -translate-x-1/2 -translate-y-1/2" style={{ width: ornamentSize, height: ornamentSize }} />
                  )}
                </div>
              </div>
              <div className="p-4 bg-slate-100">
                <button type="button" onClick={() => setShowPreview(false)} className="w-full py-2 bg-slate-400 text-white rounded">닫기</button>
              </div>
            </div>
          </div>
        )}
      <div
        className="relative w-full bg-white overflow-hidden shadow flex flex-col"
        style={{
          backgroundImage: `url('/images/letter.png')`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center top',
          backgroundSize: 'cover',
          minHeight: 680,
        }}
      >
        {/* ornament + to */}
        <div className="absolute top-24 left-12 flex items-center gap-3">
          <div className="text-3xl text-muted" style={{ fontFamily: fontFamilyMap['NANUM_PEN'] }}>Dear. {nickname || '받는 사람'}</div>
        </div>

        {/* 현재 글자수 */}
        <div className="absolute top-16 right-4 flex items-center gap-3">
          <div className="text-sm text-gray-600">현재 글자수&nbsp; {text.length}/300</div>
        </div>

        {/* transparent textarea positioned to match letter lines */}
        <div className="px-6 flex-1" style={{ paddingTop: topPadding}}>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={12}
            placeholder={'마음을 담아 편지를 작성해주세요.'}
            maxLength={300}
            className={`w-full bg-transparent resize-y outline-none text-base`}
            style={{
              lineHeight: `${lineHeight}px`,
              resize: "none",
              backgroundImage: linesBackground,
              backgroundRepeat: 'repeat',
              backgroundAttachment: 'local',
              backgroundPosition: `left ${topPadding}px`,
              padding: 0,
              minHeight: `${lineHeight * 12}px`,
              fontFamily: fontFamilyMap[selectedFont]
            }}
          />
        </div>

        {/* footer row: 작성일 (left) and From (right) */}
        <div className="w-full px-6 mb-12 flex items-center justify-between">
          <div className="text-sm text-gray-600 mt-10">작성일 {formattedDate}</div>
          <div className={`text-3xl ${styles.fontNanumPen}`}>From. {ownerNickname ?? '내가누구'}</div>
        </div>
      </div>
    </div>
  )
}
