import { textUser } from "@/app/mock/userInfoMock";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiFetch(url: string, options: RequestInit = {}) {
  let res = await fetch(url, {
    ...options,
    credentials: "include",
  });

  //   access token 만료 -> reissue
  if (res.status === 401) {
    const refreshed = await fetch(`/api/auth/reissue`, {
      method: "POST",
      credentials: "include",
    });

    if (!refreshed.ok) {
      // 로그인 만료
      window.location.href = "/login";
      throw new Error("Unauthorized"); // undefined 방지
    }

    // access token 갱신 후 재요청
    res = await fetch(url, {
      ...options,
      credentials: "include",
    });
  }

  return res;
}

// 트리 소유자 트리 정보 조회
export async function getTreeOwner(uuid: string) {
  try {
    const res = await fetch(`${BASE_URL}/trees/${uuid}`, {
      credentials: "include",
    });

    if (!res.ok) {
      console.log("목업 사용 시작");
      console.log(res);
      return textUser.body;
      // 이후 추가될 코드
      // return NextResponse.json(
      //         { error: "FAILED_TO_FETCH_UPSTREAM" },
      //         { status: res.status },
      //       );
    }

    const data = await res.json();
    const owner = data?.body;

    return owner;
  } catch (error: any) {
    throw new Error(error);
  }
}
