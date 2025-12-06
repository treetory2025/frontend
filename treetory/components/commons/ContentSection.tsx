export default function ContentSection({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-skyblue border-beige w-vw relative px-4 py-6 ${className}`}
    >
      {children}
    </div>
  );
}
