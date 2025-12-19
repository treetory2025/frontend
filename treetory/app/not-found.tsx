import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="my-auto flex h-full w-full flex-col items-center justify-center gap-4">
      <div className="bg-beige px-4 text-center">
        <h1 className="text-title text-fg-primary">404</h1>
        <p className="text-subtitle text-fg-primary">
          요청하신 페이지를 찾을 수 없습니다.
        </p>
      </div>
      <div className="flex flex-col items-center justify-center">
        <Link
          href={"/"}
          className="text-green text-subtitle w-full border-b-2 text-center font-bold"
        >
          홈으로 이동하기
        </Link>
        <p className="text-green/50 text-body">
          로그인이 필요한 경우 로그인 페이지로 이동합니다.
        </p>
      </div>
    </div>
  );
}
