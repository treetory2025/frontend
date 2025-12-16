'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';

export default function NicknameRegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const imgUrl = searchParams.get('imgUrl');

  const [nickname, setNickname] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const maxLength = 6;

  const handleComplete = async () => {
    const trimmedNickname = nickname.trim();

    if (!trimmedNickname) {
      alert('닉네임을 입력해주세요.');
      return;
    }

    if (trimmedNickname.length > maxLength) {
      alert(`닉네임은 ${maxLength}자 이하로 입력해주세요.`);
      return;
    }

    setIsLoading(true);
    try {
      // TODO: 닉네임 저장 API 호출
      // await saveNickname(trimmedNickname);

      alert('닉네임이 등록되었습니다.');
      router.back();
    } catch (err) {
      console.error(err);
      alert('닉네임 등록 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* 큰 트리 배경 (상단 중앙) */}
      <div className="absolute inset-0 mb-50 flex items-center justify-center pointer-events-none z-0">
        <Image src="/images/theme1.png" alt="tree" width={360} height={420} priority className="object-contain" />
      </div>

      {imgUrl && (
      <div className="absolute left-1/2 top-3/8 -translate-x-1/2 -translate-y-1/2 z-20">
        <img
          src={imgUrl}
          alt="ornament preview"
          className="w-24 h-24 rounded-full object-cover"
        />
      </div>
      )}

      {/* 오버레이 카드: 트리와 겹치도록 위쪽으로 올려 배치 */}
      <div
        className="absolute left-1/2 z-30 w-full"
        style={{ top: '100%', transform: 'translateX(-50%) translateY(-100%)' }}
      >
        <div className="mx-auto w-full bg-[#CCE8F3] p-6 md:p-8 shadow-xl">
          <div className="text-center mb-4">
            <h1 className="text-xl md:text-2xl mb-10 font-bold text-fg-primary">닉네임 입력</h1>
          </div>

          <div className="flex items-center gap-3">
            <input
              value={nickname}
              onChange={(e) => setNickname(e.target.value.slice(0, maxLength))}
              placeholder="닉네임을 입력해주세요."
              maxLength={maxLength}
              className="flex-1 p-3 rounded-lg border border-gray-200 bg-white"
            />
            <button
              onClick={() => { /* 확인 버튼: 추후 중복 검사 연결 */ }}
              className="px-4 py-2 bg-muted-navy text-beige rounded-lg font-semibold"
            >
              확인
            </button>
          </div>

          <p className="text-xs text-fg-secondary mt-3 mb-10">글자 수 {nickname.length}/{maxLength}</p>

          <button
            onClick={handleComplete}
            disabled={isLoading || nickname.trim().length === 0}
            className="w-full mt-6 bg-green text-beige py-3 rounded-lg font-semibold hover:opacity-90 disabled:opacity-50"
          >
            {isLoading ? '등록 중...' : '다음'}
          </button>
        </div>
      </div>
    </div>
  );
}
