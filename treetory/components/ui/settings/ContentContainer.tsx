export default function ContentContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col rounded-xl bg-white px-4 py-6 md:p-8">
      {children}
    </div>
  );
}
