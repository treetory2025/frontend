import { LucideIcon } from "lucide-react";

interface MenuItemProps {
  label: string;
  icon: LucideIcon;
  onClick?: () => void;
}

export function MenuItem({ label, icon: Icon, onClick }: MenuItemProps) {
  return (
    <button
      className="text-caption hover:bg-muted-bg flex h-8 w-full cursor-pointer items-center justify-between p-2 hover:rounded-md"
      onClick={onClick}
    >
      <p className="w-[120px] text-left leading-none">{label}</p>
      <Icon size={16} />
    </button>
  );
}
