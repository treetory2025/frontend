import { NextResponse } from "next/server";

export async function GET() {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${BASE_URL}/me`, {
    method: "GET",
    credentials: "include",
  });

  //    유효한 요청이 아닐 경우
  if (!res.ok) {
    return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
  }

  const user = await res.json();
  return NextResponse.json(user);
}
