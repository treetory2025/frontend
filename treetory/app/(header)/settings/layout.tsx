export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex h-full flex-col overflow-auto">
      {children}
    </div>
  );
}
