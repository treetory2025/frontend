import { textUser } from "@/app/mock/userInfoMock";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// client 패치
export async function apiFetch(url: string, options: RequestInit = {}) {
  console.log("api fetch urL", url);
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

// 트리 소유자 트리 정보 조회 (최초 - 서버)
export async function getTreeOwner(uuid: string) {
  try {
    const res = await fetch(`${BASE_URL}/trees/${uuid}`, {
      credentials: "include",
    });

    if (!res.ok) {
      console.log("api 불러오기 실패", res);
      return;
    }

    const data = await res.json();
    const owner = data?.body;

    return owner;
  } catch (error: any) {
    throw new Error(error);
  }
}
