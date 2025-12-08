import { NextResponse } from "next/server";

export async function POST() {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  if (!BASE_URL) {
    return NextResponse.json(
      { error: "API_URL_NOT_CONFIGURED" },
      { status: 500 },
    );
  }

  const res = await fetch(`${BASE_URL}/api/auth/reissue`, {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) {
    return NextResponse.json({ error: "REFRESH_FAILED" }, { status: 401 });
  }

  const data = await res.json();
  const payload = data.body ?? data;
  return NextResponse.json(payload);
}
