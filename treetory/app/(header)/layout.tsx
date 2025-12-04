import Header from "@/components/commons/Header";

export default function HeaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col justify-start gap-4">
      <header>
        <Header />
      </header>
      {children}
    </div>
  );
}
