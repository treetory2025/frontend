import { NextResponse } from "next/server";

export async function POST() {
  const res = await fetch(`/api/auth/reissue`, {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) {
    return NextResponse.json({ error: "REFRESH_FAILED" }, { status: 401 });
  }

  const data = await res.json();
  return NextResponse.json(data);
}
