import Image from "next/image";

type CategoryBadgeProps = {
  label: string;
  icon: string;
  active: boolean;
};

export function CategoryBadge({ label, icon, active }: CategoryBadgeProps) {
  return (
    <div
      className={`flex flex-col items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition`}
    >
      <div
        className={`rounded-full ${
          active
            ? "bg-navy border-green"
            : "bg-muted-bg text-muted-navy box-content"
        }`}
      >
        <Image
          src={icon}
          alt="카테고리 아이콘"
          width={56}
          height={56}
          className={`p-1 ${active ? "border-green rounded-full border-4" : ""}`}
        />
      </div>
      <span className={`text-caption ${active ? "text-green font-bold" : ""}`}>
        {label}
      </span>
    </div>
  );
}
