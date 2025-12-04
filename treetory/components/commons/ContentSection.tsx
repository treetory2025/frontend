import Image from "next/image";
import snowmanIcon from "@/public/icons/snowman.png";

export default function ContentSection({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-skyblue border-beige w-vw relative box-content h-full border-t-8 px-4 py-8">
      <Image
        alt="Snowman Decoration"
        src={snowmanIcon}
        width={76}
        height={76}
        className="absolute top-[-68px] right-0"
      />
      {children}
    </div>
  );
}
