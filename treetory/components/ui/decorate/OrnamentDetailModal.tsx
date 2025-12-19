"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { X } from "lucide-react";
import {
  getOrnamentDetail,
  OrnamentDetail as ApiOrnamentDetail,
} from "@/lib/api";
import OrnamentPreviewModal from "./OrnamentPreviewModal";

interface Props {
  ornamentId: number | null;
  onClose: () => void;
}

export default function OrnamentDetailModal({ ornamentId, onClose }: Props) {
  const router = useRouter();
  const params = useParams();
  const uuid = params.uuid as string;
  const [detail, setDetail] = useState<ApiOrnamentDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function fetchDetail() {
      if (ornamentId == null) return;
      setLoading(true);
      const res = await getOrnamentDetail(ornamentId);
      if (!mounted) return;
      setDetail(res);
      setLoading(false);
    }

    fetchDetail();
    return () => {
      mounted = false;
    };
  }, [ornamentId]);

  if (ornamentId == null) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-end justify-center">
        {/* backdrop */}
        <div className="absolute inset-0 bg-black/40" onClick={onClose} />

        {/* modal sheet */}
        <div
          className="bg-beige relative w-full max-w-md rounded-t-2xl p-6 pb-8 shadow-xl"
          style={{ transform: "translateY(0)" }}
        >
          <button
            className="absolute top-4 right-4 p-2"
            onClick={onClose}
            aria-label="닫기"
          >
            <X />
          </button>

          <div className="flex flex-col items-center gap-4">
            <div className="flex h-40 w-40 items-center justify-center rounded-full bg-white/60">
              {loading ? (
                <div className="text-fg-secondary text-sm">로딩...</div>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowPreview(true)}
                  className="h-36 w-36 overflow-hidden rounded-full"
                >
                  <img
                    src={detail?.imgUrl}
                    alt={detail?.name}
                    className="h-full w-full object-cover"
                  />
                </button>
              )}
            </div>

            <div className="w-full">
              <div className="text-green text-sm">장식 이름</div>
              <div className="border-green text-fg-primary mt-1 border-b pb-2 text-2xl font-semibold">
                {detail?.name ?? "-"}
              </div>
            </div>

            <button
              className="bg-green text-beige text-button mt-6 w-full cursor-pointer rounded-md px-4 py-3"
              onClick={() => {
                onClose();
                const params = new URLSearchParams();
                if (detail?.imgUrl) params.set("imgUrl", detail.imgUrl);
                if (ornamentId != null)
                  params.set("ornamentId", String(ornamentId));
                router.push(
                  `/tree/${uuid}/decorate/nickname?${params.toString()}`,
                );
              }}
            >
              해당 장식으로 진행하기
            </button>
          </div>
        </div>
      </div>
      {showPreview && (
        <OrnamentPreviewModal
          detail={detail}
          onClose={() => setShowPreview(false)}
        />
      )}
    </>
  );
}
