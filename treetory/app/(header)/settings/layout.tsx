export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="flex h-full flex-col gap-8">{children}</div>;
}
