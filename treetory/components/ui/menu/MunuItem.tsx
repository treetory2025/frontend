import { LucideIcon } from "lucide-react";
interface MenuItemProps {
  label: string;
  icon: LucideIcon | (() => null);
  onClick?: () => void;
  className?: string;
}

export function MenuItem({
  label,
  icon: Icon,
  onClick,
  className,
}: MenuItemProps) {
  return (
    <button
      className={`text-caption hover:bg-muted-bg flex h-8 w-full items-center justify-between p-2 hover:rounded-md ${className}`}
      onClick={onClick}
    >
      <p className="w-[120px] text-left leading-none">{label}</p>
      <Icon size={16} />
    </button>
  );
}
