'use client';

import { useState, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { checkOrnamentNameExists, createOrnament } from '@/lib/api';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function CreateOrnamentPage() {
  const router = useRouter();
  const params = useParams();
  const uuid = params.uuid as string;
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [ornamentName, setOrnamentName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('CHRISTMAS');
  const [isPublic, setIsPublic] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      const maxSize = 10 * 1024 * 1024;

      if (!validTypes.includes(file.type)) {
        alert('JPG, PNG, JPEG 형식만 지원합니다.');
        return;
      }

      if (file.size > maxSize) {
        alert('파일 크기는 10MB 이하여야 합니다.');
        return;
      }

      setSelectedFile(file);
      
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewUrl(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // flow: upload step -> name step -> complete
  const [step, setStep] = useState<'upload' | 'name'>('upload');
  const [nameCheckLoading, setNameCheckLoading] = useState(false);
  const [nameAvailable, setNameAvailable] = useState<boolean | null>(null);

  const handleNext = async () => {
    if (!selectedFile) {
      alert('이미지를 선택해주세요.');
      return;
    }

    // 공유하지 않은 경우: 바로 API 호출 (name 없음, category = PRIVATE)
    if (!isPublic) {
      setIsLoading(true);
      try {
        // name 없음, category는 PRIVATE, isPublic 미포함
        const created = await createOrnament(undefined, 'PRIVATE', previewUrl);
        if (!created) throw new Error('오너먼트 생성 실패');

        alert('장식이 등록되었습니다.');
        router.push(`/tree/${uuid}/decorate/nickname`);
      } catch (err) {
        console.error(err);
        alert('장식 등록 중 오류가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
      return;
    }

    // 공유한 경우: 이름 입력 화면으로 이동
    setStep('name');
  };

  const handleCheckName = async () => {
    const name = ornamentName.trim();
    if (!name) {
      alert('이름을 입력해주세요.');
      return;
    }

    if (name.length > 10) {
      alert('장식 이름은 10자 이하로 입력해주세요.');
      return;
    }

    setNameCheckLoading(true);
    try {
      const exists = await checkOrnamentNameExists(name);
      setNameAvailable(!exists);
    } catch (err) {
      console.error(err);
      setNameAvailable(null);
    } finally {
      setNameCheckLoading(false);
    }
  };

  const handleComplete = async () => {
    const name = ornamentName.trim();
    if (!selectedFile) {
      alert('이미지를 선택해주세요.');
      return;
    }
    if (!name) {
      alert('이름을 입력해주세요.');
      return;
    }
    if (name.length > 10) {
      alert('장식 이름은 10자 이하로 입력해주세요.');
      return;
    }
    if (nameAvailable === false) {
      alert('이미 사용 중인 이름입니다. 다른 이름을 입력해주세요.');
      return;
    }

    setIsLoading(true);
    try {
      const created = await createOrnament(name, selectedCategory, previewUrl);
      if (!created) throw new Error('오너먼트 생성 실패');

      alert('장식이 등록되었습니다.');
        router.push(`/tree/${uuid}/decorate/nickname?imgUrl=${encodeURIComponent(previewUrl ?? '')}`);
    } catch (err) {
      console.error(err);
      alert('장식 등록 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#CCE8F3' }} className="flex-1 overflow-y-auto p-4 md:p-6">
      {/* 헤더 */}
      <div className="mb-6">
        <div className="flex items-center justify-center py-4 w-fit mx-auto">
          <h1 className="text-xl md:text-2xl font-bold text-fg-primary">장식 만들기</h1>
        </div>
        <div className="h-1 bg-green rounded-full mx-auto" style={{ width: '133px' }}></div>
      </div>

      {/* 이미지 업로드 + 공유: 업로드 단계에서만 표시 */}
      {step === 'upload' && (
        <>
        {/* 이미지 업로드 */}
        <div className="mb-8">
        <h2 className="text-lg font-semibold text-fg-primary mb-3">이미지 업로드</h2>
        <p className="text-sm text-fg-secondary mb-4">
          배경이 제거된 이미지일수록 자연스럽게 장식됩니다.
        </p>

        <div className="flex justify-center items-center gap-12">
          <div 
            className="w-32 h-32 rounded-full bg-beige flex items-center justify-center flex-shrink-0 cursor-pointer hover:opacity-80"
            onClick={() => fileInputRef.current?.click()}
          >
            {previewUrl ? (
              <img src={previewUrl} alt="preview" className="w-full h-full object-cover rounded-full" />
            ) : (
              <div className="text-center">
                <div className="text-4xl mb-2">🖼</div>
                <p className="text-xs text-fg-secondary">이미지 선택</p>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <div className="text-sm text-fg-secondary">
              <p className="font-semibold">지원 파일 형식</p>
              <p>JPG, PNG, JPEG</p>
              <p className="mt-2 font-semibold">최대 용량</p>
              <p>10MB 이하</p>
            </div>

            <button 
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center justify-center gap-2 bg-muted-navy text-beige px-4 py-2 rounded-lg font-semibold hover:opacity-90 w-fit"
            >
              <span>📁</span>
              파일선택
            </button>
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/jpg"
          onChange={handleFileSelect}
          className="hidden"
        />
        
        </div>

        {/* 트리토리 장식 공유 */}
        <div className="mb-8">
        <h2 className="text-lg font-semibold text-fg-primary mb-3">트리토리 장식 공유</h2>
        <button
          onClick={() => setIsPublic(!isPublic)}
          className={`w-full flex items-center justify-between p-4 rounded-lg border-2 transition-all ${
            isPublic
              ? 'bg-white border-green'
              : 'bg-white border-gray-200 hover:border-gray-300'
          }`}
        >
          <span className="text-fg-primary font-medium">다른 사용자들과 공유할까요?</span>
          {isPublic && (
            <div className="w-6 h-6 rounded-full bg-green flex items-center justify-center">
              <span className="text-white text-sm">✓</span>
            </div>
          )}
          {!isPublic && (
            <div className="w-6 h-6 rounded-full border-2 border-gray-300"></div>
          )}
        </button>
        </div>
        </>
      )}


      {/* 이름 입력 단계 (피그마 화면) */}
      {step === 'name' && (
        <div>
          <div className="flex items-center justify-center mb-4">
            <div className="w-48 h-48 rounded-full bg-beige flex items-center justify-center">
              {previewUrl ? (
                <img src={previewUrl} alt="preview" className="w-full h-full object-cover rounded-full" />
              ) : (
                <div className="text-2xl">🖼</div>
              )}
            </div>
          </div>

          <label className="text-sm text-fg-secondary">장식 이름</label>
          <div className="relative mt-2">
            <input
              value={ornamentName}
              onChange={(e) => {
                const v = e.target.value.slice(0, 10);
                setOrnamentName(v);
                setNameAvailable(null);
              }}
              placeholder="내가 만든 쿠키"
              maxLength={10}
              className="w-full p-3 rounded-lg border border-gray-200 bg-white pr-24"
            />

            <button
              onClick={handleCheckName}
              disabled={nameCheckLoading}
              className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-muted-navy text-beige rounded-lg font-semibold"
            >
              {nameCheckLoading ? '확인중...' : '확인'}
            </button>
          </div>

          <div className="mt-2 text-sm">
            {nameAvailable === true && <span className="text-green">사용 가능한 이름입니다.</span>}
            {nameAvailable === false && <span className="text-red-600">이미 사용 중인 이름입니다.</span>}
          </div>
        </div>
      )}

      
      {/* 경고 */}
      {step === 'upload' && (
        
        <div className="mt-4 mb-4 flex items-center gap-3 p-4 bg-yellow-100 border-l-4 border-yellow-400 rounded">
        <span className="text-xl">⚠️</span>
        <div>
          <p className="text-sm font-semibold text-fg-primary">운영정책에 따라 부적절한 장식은 삭제될 수 있습니다.</p>
        </div>
      </div>
      )}

      {/* 장식 분류 선택 */}
      {step === 'name' && (
      <div className="w-full mt-2 mb-4">
        <div className="text-sm text-fg-secondary mb-2">장식 분류</div>
        <div className="flex items-center justify-center gap-6">
          {[
            { id: 'CHRISTMAS', label: '크리스마스', icon: '🎄' },
            { id: 'FOOD', label: '음식', icon: '🍪' },
            { id: 'ANIMAL', label: '동물', icon: '🦌' },
            { id: 'ETC', label: '기타', icon: '✨' },
          ].map((c) => {
            const selected = selectedCategory === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setSelectedCategory(c.id)}
                className="flex flex-col items-center gap-1 focus:outline-none"
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center border ${selected ? 'border-4 border-green bg-navy text-green' : 'border-transparent bg-beige text-fg-primary'}`}>
                  <span className="text-lg">{c.icon}</span>
                </div>
                <div className={`text-xs ${selected ? 'text-green' : 'text-fg-secondary'}`}>{c.label}</div>
              </button>
            );
          })}
        </div>
      </div>
      )}

      {/* 하단 버튼: 업로드 단계에서는 다음, 이름 단계에서는 완료/이전 */}
      {step === 'upload' ? (
        <button
          onClick={handleNext}
          disabled={isLoading}
          className="w-full bg-green text-beige py-4 rounded-lg font-semibold hover:opacity-90 disabled:opacity-50"
        >
          다음
        </button>
      ) : (
        <div className="flex gap-3">
          <button
            onClick={() => setStep('upload')}
            disabled={isLoading}
            className="flex-1 bg-gray-200 text-fg-primary py-4 rounded-lg font-semibold hover:opacity-90 disabled:opacity-50"
          >
            이전
          </button>
          <button
            onClick={handleComplete}
            disabled={isLoading || nameAvailable === false || ornamentName.trim().length === 0}
            className="flex-1 bg-green text-beige py-4 rounded-lg font-semibold hover:opacity-90 disabled:opacity-50"
          >
            {isLoading ? '등록 중...' : '완료'}
          </button>
        </div>
      )}
    </div>
  );
}

