import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch(`/api/members/me`, {
    method: "GET",
    credentials: "include",
  });

  //    유효한 요청이 아닐 경우
  if (!res.ok) {
    return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
  }

  const data = await res.json();
  const user = data.body;
  return NextResponse.json(user);
}
