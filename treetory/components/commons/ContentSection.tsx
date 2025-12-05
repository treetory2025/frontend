import Image from "next/image";
import snowmanIcon from "@/public/icons/snowman.png";

export default function ContentSection({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-skyblue border-beige w-vw relative px-4 py-6 md:h-full ${className}`}
    >
      {children}
    </div>
  );
}
