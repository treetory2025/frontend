export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="no-scrollbar relative flex min-h-dvh w-full flex-col overflow-y-auto">
      {children}
    </div>
  );
}
