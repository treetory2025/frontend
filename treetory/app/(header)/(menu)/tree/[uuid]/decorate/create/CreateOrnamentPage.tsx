'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function CreateOrnamentPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [ornamentName, setOrnamentName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('선택안함');
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

  const handleUpload = async () => {
    if (!selectedFile || !ornamentName.trim()) {
      alert('이미지와 이름을 입력해주세요.');
      return;
    }

    setIsLoading(true);

    try {
      const imageUrl = previewUrl;

      const payload = {
        name: ornamentName,
        category: selectedCategory,
        imgUrl: imageUrl,
        isPublic,
      };

      const res = await fetch(`${BASE_URL}/api/ornaments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error('장식 등록 실패');
      }

      alert('장식이 등록되었습니다!');
      router.back();
    } catch (error) {
      console.error('오류:', error);
      alert('장식 등록 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#CCE8F3' }} className="flex-1 overflow-y-auto p-4 md:p-6">
      {/* 헤더 */}
      <div className="mb-6">
        <div className="flex items-center justify-center py-4">
          <h1 className="text-xl md:text-2xl font-bold text-fg-primary">장식 만들기</h1>
        </div>
        <div className="w-full h-1 bg-green rounded-full"></div>
      </div>

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

        {selectedFile && (
          <p className="text-xs text-fg-secondary mt-2">선택된 파일: {selectedFile.name}</p>
        )}
      </div>

      {/* 이름 입력 */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-fg-primary mb-3">장식 이름</h2>
        <input
          type="text"
          placeholder="장식의 이름을 입력하세요"
          value={ornamentName}
          onChange={(e) => setOrnamentName(e.target.value)}
          className="w-full rounded-lg border-0 bg-beige py-3 px-4 text-body placeholder-fg-secondary focus:outline-none focus:ring-2 focus:ring-green"
        />
      </div>

      {/* 프레임 선택 */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-fg-primary mb-3">프레임 선택</h2>
        <p className="text-sm text-fg-secondary mb-4">
          장식과 어울리는 프레임을 선택해 보세요!
        </p>

        <div className="grid grid-cols-4 gap-4">
          {['선택안함', '프레임1', '프레임2', '프레임3'].map((label) => (
            <button
              key={label}
              onClick={() => setSelectedCategory(label)}
              className={`flex flex-col items-center gap-2 p-4 rounded-lg transition-all ${
                selectedCategory === label
                  ? 'bg-green text-beige'
                  : 'bg-beige text-fg-primary hover:bg-gray-100'
              }`}
            >
              <div className="text-3xl">
                {label === '선택안함' ? '🎄' : '🦌'}
              </div>
              <p className="text-xs font-semibold text-center">{label}</p>
            </button>
          ))}
        </div>
      </div>

      {/* 경고 */}
      <div className="mb-8 flex gap-3 p-4 bg-yellow-100 border-l-4 border-yellow-400 rounded">
        <span className="text-xl">⚠️</span>
        <div>
          <p className="text-sm font-semibold text-fg-primary">운영정책에 따라 부적절한 장식은 삭제될 수 있습니다.</p>
        </div>
      </div>

      {/* 완료 버튼 */}
      <button 
        onClick={handleUpload}
        disabled={isLoading}
        className="w-full bg-green text-beige py-4 rounded-lg font-semibold hover:opacity-90 disabled:opacity-50"
      >
        {isLoading ? '등록 중...' : '다음'}
      </button>
    </div>
  );
}

