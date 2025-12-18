"use client";

import { useState, useRef, useCallback } from "react";
import { Upload, Check, X } from "lucide-react";
import Cropper from "react-easy-crop";
import { Area } from "react-easy-crop";
import { useRouter, useParams } from "next/navigation";
import {
  checkOrnamentNameExists,
  createOrnament,
  uploadOrnamentImage,
} from "@/lib/api";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function CreateOrnamentPage() {
  const router = useRouter();
  const params = useParams();
  const uuid = params.uuid as string;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [ornamentName, setOrnamentName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("CHRISTMAS");
  const [isPublic, setIsPublic] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [showCrop, setShowCrop] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/png", "image/jpg"];
      const maxSize = 10 * 1024 * 1024;

      if (!validTypes.includes(file.type)) {
        alert("JPG, PNG, JPEG 형식만 지원합니다.");
        return;
      }

      if (file.size > maxSize) {
        alert("파일 크기는 10MB 이하여야 합니다.");
        return;
      }

      setSelectedFile(file);

      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        setPreviewUrl(dataUrl);
        // open crop modal for user to adjust
        setShowCrop(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = useCallback(
    (_: Area, croppedAreaPixelsParam: Area) => {
      setCroppedAreaPixels(croppedAreaPixelsParam);
    },
    [],
  );

  const createImage = (url: string) =>
    new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.addEventListener("load", () => resolve(img));
      img.addEventListener("error", (e) => reject(e));
      img.setAttribute("crossOrigin", "anonymous");
      img.src = url;
    });

  const getCroppedImg = async (imageSrc: string, pixelCrop: Area) => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("No canvas context");

    // 원형으로 자르기
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const radius = Math.min(canvas.width, canvas.height) / 2;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height,
    );

    ctx.restore();

    return canvas.toDataURL("image/png");
  };

  const applyCrop = async () => {
    if (!previewUrl || !croppedAreaPixels) {
      setShowCrop(false);
      return;
    }
    try {
      const croppedDataUrl = await getCroppedImg(previewUrl, croppedAreaPixels);
      setPreviewUrl(croppedDataUrl);
    } catch (e) {
      console.error("crop error", e);
    } finally {
      setShowCrop(false);
    }
  };

  // flow: upload step -> name step -> complete
  const [step, setStep] = useState<"upload" | "name">("upload");
  const [nameCheckLoading, setNameCheckLoading] = useState(false);
  const [nameAvailable, setNameAvailable] = useState<boolean | null>(null);

  const handleNext = async () => {
    if (!selectedFile) {
      alert("이미지를 선택해주세요.");
      return;
    }

    // 공유하지 않은 경우: 바로 API 호출 (name 없음, category = PRIVATE)
    if (!isPublic) {
      setIsLoading(true);
      try {
        // previewUrl이 data URL이면 업로드해서 실제 URL을 얻는다
        let imgUrl = previewUrl;
        if (previewUrl?.startsWith("data:")) {
          const uploaded = await uploadOrnamentImage(previewUrl);
          if (!uploaded) throw new Error("이미지 업로드 실패");
          imgUrl = uploaded;
        }

        // name 없음, category는 PRIVATE, isPublic 미포함
        const created = await createOrnament(undefined, "PRIVATE", imgUrl);
        if (!created) throw new Error("오너먼트 생성 실패");

        // backend returns { header: { message }, body: { ornamentId } }
        const ornamentId =
          (created as any)?.body?.ornamentId ??
          (created as any)?.ornamentId ??
          null;

        alert("장식이 등록되었습니다.");
        const params = new URLSearchParams();
        if (imgUrl) params.set("imgUrl", imgUrl);
        if (ornamentId) params.set("ornamentId", String(ornamentId));
        router.push(`/tree/${uuid}/decorate/nickname?${params.toString()}`);
      } catch (err) {
        console.error(err);
        alert("장식 등록 중 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
      return;
    }

    // 공유한 경우: 이름 입력 화면으로 이동
    setStep("name");
  };

  const handleCheckName = async () => {
    const name = ornamentName.trim();
    if (!name) {
      alert("이름을 입력해주세요.");
      return;
    }

    // 특수문자(이모지 포함) 허용하지 않음: 한글, 영문, 숫자, 공백과 언더바(_)만 허용
    const invalidChar = /[^\p{L}\p{N}_\s]/u.test(name);
    if (invalidChar) {
      alert("특수문자는 사용할 수 없습니다. 한글, 영문, 숫자만 허용됩니다.");
      return;
    }

    if (name.length < 2) {
      alert("장식 이름은 2자 이상으로 입력해주세요.");
      return;
    }

    if (name.length > 12) {
      alert("장식 이름은 12자 이하로 입력해주세요.");
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
      alert("이미지를 선택해주세요.");
      return;
    }
    if (!name) {
      alert("이름을 입력해주세요.");
      return;
    }

    // 특수문자(이모지 포함) 허용하지 않음: 한글, 영문, 숫자, 언더바(_)만 허용
    const invalidChar = /[^\p{L}\p{N}_\s]/u.test(name);
    if (invalidChar) {
      alert("한글, 영문, 숫자, 언더바(_)만 허용됩니다.");
      return;
    }

    if (name.length < 2) {
      alert("장식 이름은 2자 이상으로 입력해주세요.");
      return;
    }

    if (name.length > 12) {
      alert("장식 이름은 12자 이하로 입력해주세요.");
      return;
    }
    if (nameAvailable === false) {
      alert("이미 사용 중인 이름입니다. 다른 이름을 입력해주세요.");
      return;
    }

    setIsLoading(true);
    try {
      // previewUrl이 data URL이면 업로드
      let imgUrl = previewUrl;
      if (previewUrl?.startsWith("data:")) {
        const uploaded = await uploadOrnamentImage(previewUrl);
        if (!uploaded) throw new Error("이미지 업로드 실패");
        imgUrl = uploaded;
      }

      const created = await createOrnament(name, selectedCategory, imgUrl);
      if (!created) throw new Error("오너먼트 생성 실패");

      const ornamentId =
        (created as any)?.body?.ornamentId ??
        (created as any)?.ornamentId ??
        null;

      alert("장식이 등록되었습니다.");
      const params = new URLSearchParams();
      if (imgUrl) params.set("imgUrl", imgUrl);
      if (ornamentId) params.set("ornamentId", String(ornamentId));
      router.push(`/tree/${uuid}/decorate/nickname?${params.toString()}`);
    } catch (err) {
      console.error(err);
      alert("장식 등록 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{ backgroundColor: "#CCE8F3" }}
      className="flex-1 overflow-y-auto p-4 md:p-6"
    >
      {/* 헤더 */}
      <div className="mb-6">
        <div className="mx-auto flex w-fit items-center justify-center py-4">
          <h1 className="text-fg-primary text-xl font-bold md:text-2xl">
            장식 만들기
          </h1>
        </div>
        <div
          className="bg-green mx-auto h-1 rounded-full"
          style={{ width: "133px" }}
        ></div>
      </div>

      {/* 이미지 업로드 + 공유: 업로드 단계에서만 표시 */}
      {step === "upload" && (
        <>
          {/* 이미지 업로드 */}
          <div className="mb-8">
            <h2 className="text-fg-primary mb-3 text-lg font-semibold">
              이미지 업로드
            </h2>
            <p className="text-fg-secondary mb-4 text-sm">
              배경이 제거된 이미지일수록 자연스럽게 장식됩니다.
            </p>

            <div className="flex items-center justify-around gap-12">
              <div
                className="bg-beige flex h-48 w-48 flex-shrink-0 cursor-pointer items-center justify-center rounded-full hover:opacity-80"
                onClick={() => fileInputRef.current?.click()}
              >
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="text-center">
                    <p className="text-fg-secondary text-xs">이미지 선택</p>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-3">
                <div className="text-fg-secondary text-sm">
                  <p className="font-semibold">지원 파일 형식</p>
                  <p>JPG, PNG, JPEG</p>
                  <p className="mt-2 font-semibold">최대 용량</p>
                  <p>10MB 이하</p>
                </div>

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-muted-navy text-beige font-base flex w-fit items-center justify-center gap-2 rounded-lg px-4 py-2 hover:opacity-90"
                >
                  <Upload className="text-beige h-5 w-5" />
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
            {/* Crop modal */}
            {showCrop && previewUrl && (
              <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div
                  className="absolute inset-0 bg-black/50"
                  onClick={() => setShowCrop(false)}
                />
                <div className="relative z-60 w-11/12 max-w-lg rounded-lg bg-white p-4">
                  <div className="relative h-64 w-full bg-gray-100">
                    <Cropper
                      image={previewUrl}
                      crop={crop}
                      zoom={zoom}
                      aspect={1}
                      onCropChange={setCrop}
                      onZoomChange={setZoom}
                      onCropComplete={onCropComplete}
                    />
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <input
                      type="range"
                      min={1}
                      max={3}
                      step={0.1}
                      value={zoom}
                      onChange={(e) => setZoom(Number(e.target.value))}
                    />
                    <div className="flex-1" />
                    <button
                      type="button"
                      onClick={() => setShowCrop(false)}
                      className="rounded bg-gray-200 px-3 py-2"
                    >
                      취소
                    </button>
                    <button
                      type="button"
                      onClick={applyCrop}
                      className="bg-green rounded px-3 py-2 text-white"
                    >
                      확인
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 트리토리 장식 공유 */}
          <div className="mb-8">
            <h2 className="text-fg-primary mb-3 text-lg font-semibold">
              트리토리 장식 공유
            </h2>
            <button
              onClick={() => setIsPublic(!isPublic)}
              className={`flex w-full items-center justify-between rounded-lg border-2 p-4 transition-all ${
                isPublic
                  ? "border-green bg-white"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <span className="text-fg-primary font-medium">
                다른 사용자들과 공유할까요?
              </span>
              {isPublic && (
                <div className="bg-green flex h-6 w-6 items-center justify-center rounded-full">
                  <span className="text-sm text-white">✓</span>
                </div>
              )}
              {!isPublic && (
                <div className="h-6 w-6 rounded-full border-2 border-gray-300"></div>
              )}
            </button>
          </div>
        </>
      )}

      {/* 이름 입력 단계 (피그마 화면) */}
      {step === "name" && (
        <div>
          <div className="mb-4 flex items-center justify-center">
            <div className="bg-beige flex h-48 w-48 items-center justify-center rounded-full">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="preview"
                  className="h-full w-full rounded-full object-cover"
                />
              ) : (
                <div className="text-2xl">🖼</div>
              )}
            </div>
          </div>

          <label className="text-md text-fg-secondary">장식 이름</label>
          <div className="relative mt-2">
            <input
              value={ornamentName}
              onChange={(e) => {
                const v = e.target.value.slice(0, 10);
                setOrnamentName(v);
                setNameAvailable(null);
              }}
              placeholder="내가 만든 쿠키"
              maxLength={12}
              className="w-full rounded-lg border border-gray-200 bg-white p-3 pr-24"
            />

            <button
              onClick={handleCheckName}
              disabled={nameCheckLoading}
              className="bg-muted-navy text-beige absolute top-1/2 right-2 -translate-y-1/2 rounded-lg px-4 py-2 font-semibold"
            >
              {nameCheckLoading ? "확인중..." : "확인"}
            </button>
          </div>
          <div className="text-fg-secondary mt-2 text-xs">
            한글, 영어, 숫자 포함 최소 2글자 ~ 최대 12글자 '_'만 가능
          </div>

          <div className="mt-1 text-center text-sm">
            {nameAvailable === true && (
              <span className="text-green inline-flex items-center justify-center gap-2">
                <Check className="h-4 w-4" />
                <span>사용 가능한 이름입니다.</span>
              </span>
            )}
            {nameAvailable === false && (
              <span className="inline-flex items-center justify-center gap-2 text-red-600">
                <X className="h-4 w-4" />
                <span>이미 사용 중인 이름입니다.</span>
              </span>
            )}
          </div>
        </div>
      )}

      {/* 경고 */}
      {step === "upload" && (
        <div className="mt-4 mb-4 flex items-center gap-3 rounded border-l-4 border-yellow-400 bg-yellow-100 p-4">
          <span className="text-xl">⚠️</span>
          <div>
            <p className="text-fg-primary text-sm font-semibold">
              운영정책에 따라 부적절한 장식은 삭제될 수 있습니다.
            </p>
          </div>
        </div>
      )}

      {/* 장식 분류 선택 */}
      {step === "name" && (
        <div className="mt-4 mb-4 w-full">
          <div className="text-md text-fg-secondary mb-2">장식 분류</div>
          <div className="flex items-center justify-center gap-6">
            {[
              { id: "CHRISTMAS", label: "크리스마스", icon: "🎄" },
              { id: "FOOD", label: "음식", icon: "🍪" },
              { id: "ANIMAL", label: "동물", icon: "🦌" },
              { id: "ETC", label: "기타", icon: "✨" },
            ].map((c) => {
              const selected = selectedCategory === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setSelectedCategory(c.id)}
                  className="flex flex-col items-center gap-1 focus:outline-none"
                >
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full border ${selected ? "border-green bg-navy text-green border-4" : "bg-beige text-fg-primary border-transparent"}`}
                  >
                    <span className="text-lg">{c.icon}</span>
                  </div>
                  <div
                    className={`text-xs ${selected ? "text-green" : "text-fg-secondary"}`}
                  >
                    {c.label}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 하단 버튼: 업로드 단계에서는 다음, 이름 단계에서는 완료/이전 */}
      {step === "upload" ? (
        <button
          onClick={handleNext}
          disabled={isLoading}
          className="bg-green text-beige w-full rounded-lg py-4 font-semibold hover:opacity-90 disabled:opacity-50"
        >
          다음
        </button>
      ) : (
        <div className="flex gap-3">
          <button
            onClick={() => setStep("upload")}
            disabled={isLoading}
            className="text-fg-primary flex-1 rounded-lg bg-gray-200 py-4 font-semibold hover:opacity-90 disabled:opacity-50"
          >
            이전
          </button>
          <button
            onClick={handleComplete}
            disabled={!nameAvailable}
            className="bg-green text-beige flex-1 rounded-lg py-4 font-semibold hover:opacity-90 disabled:opacity-50"
          >
            {isLoading ? "등록 중..." : "완료"}
          </button>
        </div>
      )}
    </div>
  );
}
