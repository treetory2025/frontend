import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
  const { nickname } = await request.json();

  // 닉네임이 없거나 동일한 경우: 변경 처리 안 하고 성공 응답 반환
  if (!nickname) {
    return NextResponse.json(
      { message: "닉네임 없음 → 변경 스킵" },
      { status: 200 },
    );
  }

  // TODO: DB에 닉네임 업데이트
  return NextResponse.json(
    { message: "닉네임 업데이트 완료", nickname },
    { status: 200 },
  );
}
