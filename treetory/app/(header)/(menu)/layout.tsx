import MemberSearchBottomSheet from "@/components/ui/memberSearch/MemberSearchBottomSheet";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="no-scrollbar relative flex h-full w-full flex-col overflow-auto">
      {children}
      <MemberSearchBottomSheet />
    </div>
  );
}
