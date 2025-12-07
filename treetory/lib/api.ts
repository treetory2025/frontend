export async function apiFetch(url: string, options: RequestInit = {}) {
  let res = await fetch(url, {
    ...options,
    credentials: "include",
  });
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  //   access token 만료 -> reissue
  if (res.status === 401) {
    const refreshed = await fetch(`${BASE_URL}/auth/reissue`, {
      method: "POST",
      credentials: "include",
    });

    if (!refreshed.ok) {
      // 로그인 만료
      window.location.href = "/login";
      return;
    }

    // access token 갱신 후 재요청
    res = await fetch(url, {
      ...options,
      credentials: "include",
    });
  }

  return res;
}
