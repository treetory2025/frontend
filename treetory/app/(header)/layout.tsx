import Header from "@/components/commons/Header";

export default function HeaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full flex-col justify-start gap-8">
      <header>
        <Header />
      </header>
      {children}
    </div>
  );
}
