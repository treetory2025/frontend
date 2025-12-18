import { useBgmStore } from "@/store/useBGMStore";
import { Volume2, VolumeOff } from "lucide-react";

export default function BGMButton() {
  const enabled = useBgmStore((s) => s.enabled);
  const toggle = useBgmStore((s) => s.toggle);

  return (
    <button
      onClick={toggle}
      className="text-caption fixed bottom-4 left-4 z-100 rounded-full bg-black/60 px-4 py-2 text-white"
    >
      {enabled ? (
        <div className="flex items-center gap-2">
          <Volume2 size={16} />
          <p>BGM ON</p>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <VolumeOff size={16} />
          <p>BGM OFF</p>
        </div>
      )}
    </button>
  );
}
