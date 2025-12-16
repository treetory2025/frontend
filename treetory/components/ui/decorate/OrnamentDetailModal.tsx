"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { X } from 'lucide-react';
import { getOrnamentDetail, OrnamentDetail as ApiOrnamentDetail } from '@/lib/api';
import OrnamentPreviewModal from './OrnamentPreviewModal';

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
      <div className="relative w-full max-w-md rounded-t-2xl bg-beige p-6 pb-8 shadow-xl" style={{ transform: 'translateY(0)' }}>
        <button className="absolute right-4 top-4 p-2" onClick={onClose} aria-label="닫기">
          <X />
        </button>

        <div className="flex flex-col items-center gap-4">
          <div className="w-40 h-40 rounded-full bg-white/60 flex items-center justify-center">
            {loading ? (
              <div className="text-sm text-fg-secondary">로딩...</div>
            ) : (
              <button type="button" onClick={() => setShowPreview(true)} className="w-36 h-36 rounded-full overflow-hidden">
                <img src={detail?.imgUrl} alt={detail?.name} className="w-full h-full object-cover" />
              </button>
            )}
          </div>

          <div className="w-full">
            <div className="text-xs text-fg-secondary">장식 이름</div>
            <div className="mt-1 border-b pb-2 font-semibold text-lg text-fg-primary">{detail?.name ?? '-'}</div>
          </div>

          <button className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-medium" onClick={() => { 
            onClose();
            router.push(
              `/tree/${uuid}/decorate/nickname?imgUrl=${encodeURIComponent(detail?.imgUrl ?? '')}`
            );
          }}>
            해당 장식으로 진행하기
            <span className="ml-2">→</span>
          </button>

          <button className="mt-6 w-full rounded-md bg-green px-4 py-3 text-beige font-semibold" onClick={onClose}>확인</button>
        </div>
      </div>
    </div>
    {showPreview && (
      <OrnamentPreviewModal detail={detail} onClose={() => setShowPreview(false)} />
    )}
    </>
  );
}
