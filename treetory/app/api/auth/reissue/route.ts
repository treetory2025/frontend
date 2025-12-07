import { NextResponse } from "next/server";

export async function POST() {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${BASE_URL}/auth/reissue`, {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) {
    return NextResponse.json({ error: "REFRESH_FAILED" }, { status: 401 });
  }

  const data = await res.json();
  return NextResponse.json(data);
}
