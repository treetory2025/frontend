import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ uuid: string }> },
) {
  const { uuid } = await context.params;
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  if (!BASE_URL) {
    return NextResponse.json(
      { error: "API_URL_NOT_CONFIGURED" },
      { status: 500 },
    );
  }
  try {
    const res = await fetch(`${BASE_URL}/api/trees/${uuid}`, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "FAILED_TO_FETCH_UPSTREAM" },
        { status: res.status },
      );
    }

    const data = await res.json();
    const user = data?.body;

    return NextResponse.json(user, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: "SERVER_ERROR", details: error.message },
      { status: 500 },
    );
  }
}
