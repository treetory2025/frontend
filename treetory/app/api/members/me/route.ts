import { NextResponse } from "next/server";

export async function GET() {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  if (!BASE_URL) {
    return NextResponse.json(
      { error: "API_URL_NOT_CONFIGURED" },
      { status: 500 },
    );
  }

  const res = await fetch(`${BASE_URL}/api/members/me`, {
    method: "GET",
    credentials: "include",
  });

  //    유효한 요청이 아닐 경우
  if (!res.ok) {
    return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
  }

  const data = await res.json();
  // 백엔드가 { header, body } 형태를 주면 body만 반환, 아니면 전체 반환
  const user = data.body ?? data;
  return NextResponse.json(user);
}
