import { textUser } from "@/app/mock/userInfoMock";
import { useUserStore } from "@/store/userStore";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// client 패치
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
      useUserStore.getState().clearUser();
      throw new Error("AUTH_EXPIRED");
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

export async function getBookmarks({
  query,
  page,
  size,
}: {
  query?: string;
  page: string;
  size: string;
}) {
  try {
    let url = "/api/members/bookmarks";

    // 🔑 query가 있을 때만 page, size 포함
    if (query && query.trim() !== "") {
      const params = new URLSearchParams({
        query,
        page: String(page),
        size: String(size),
      });
      url += `?${params.toString()}`;
    }

    const res = await apiFetch(url, {
      credentials: "include",
    });

    if (!res.ok) {
      console.log("즐겨찾기 정보 조회 실패", res);
      return;
    }

    const data = await res.json();
    console.log("북마크조회", data);
    return data?.body;
  } catch (error) {
    console.error(error);
  }
}

// ============================================
// 오너먼트 관련 API
// ============================================

// 1. 오너먼트 조회
// GET /api/ornaments?word={word}&category={category}&page={page}
export interface Ornament {
  ornamentId: number;
  name: string;
  imgUrl: string;
}

export interface Ornaments {
  content: Ornament[];
  pageNum: number;
  pageSize: number;
  totalPage: number;
  totalElements: number;
}

export async function getOrnaments(
  word: string = "",
  category: string = "",
  page: number = 0,
): Promise<Ornaments | null> {
  try {
    const params = new URLSearchParams();
    if (word) params.append("word", word);
    if (category && category !== "all") params.append("category", category);
    if (page > 0) params.append("page", page.toString());

    const url = `/api/ornaments${params.toString() ? "?" + params.toString() : ""}`;
    const res = await apiFetch(url);

    if (!res.ok) {
      console.log("오너먼트 조회 실패", res);
      return null;
    }

    const data = await res.json();
    return data?.body.ornaments;
  } catch (error: any) {
    console.error("오너먼트 조회 에러:", error);
    return null;
  }
}

// 2. 오너먼트 등록
// POST /api/ornaments
// Request: { name?: string, category: string, imgUrl: string }
// 백엔드에서 name 없으면 isPublic=false, name 있으면 isPublic=true로 판단
export async function createOrnament(
  name: string | undefined,
  category: string,
  imgUrl: string,
): Promise<any> {
  try {
    const payload: any = { category, imgUrl };
    if (name) {
      payload.name = name;
    }

    const res = await apiFetch(`/api/ornaments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      // 로그에 응답 상태와 본문을 남겨 디버깅에 도움을 줌
      const text = await res.text().catch(() => "<<no body>>");
      console.error("오너먼트 등록 실패", {
        status: res.status,
        statusText: res.statusText,
        body: text,
      });
      return null;
    }

    // 성공 응답이지만 body가 비어있을 수 있음 -> 가능한 값을 반환하거나 성공 표시 객체를 반환
    const data = await res.json().catch(() => ({}));
    const body = data?.body;
    if (body && Object.keys(body).length > 0) {
      return body;
    }

    // body가 비어있어도 HTTP 2xx 이므로 성공으로 간주
    return { success: true };
  } catch (error: any) {
    console.error("오너먼트 등록 에러:", error);
    return null;
  }
}

// 3. 오너먼트 이름 중복 조회
// GET /api/ornaments/exists?name={name}
// 필요: 로그인
export async function checkOrnamentNameExists(name: string): Promise<boolean> {
  try {
    const params = new URLSearchParams({ name });
    const res = await apiFetch(
      `https://develop.bacinf.com/api/ornaments/exists?${params.toString()}`,
    );

    if (!res.ok) {
      console.log("오너먼트 이름 중복 조회 실패", res);
      return false;
    }

    const data = await res.json();
    return data?.isExists ?? false;
  } catch (error: any) {
    console.error("오너먼트 이름 중복 조회 에러:", error);
    return false;
  }
}

// 4. 오너먼트 상세 조회
// GET /api/ornaments/{ornamentId}
export interface OrnamentDetail {
  name: string;
  category: string;
  imgUrl: string;
  userNickname: string;
  createdDate: string;
}

export async function getOrnamentDetail(
  ornamentId: number,
): Promise<OrnamentDetail | null> {
  try {
    const res = await apiFetch(
      `https://develop.bacinf.com/api/ornaments/${ornamentId}`,
    );

    if (!res.ok) {
      console.log("오너먼트 상세 조회 실패", res);
      return null;
    }

    const data = await res.json();
    return data?.body;
  } catch (error: any) {
    console.error("오너먼트 상세 조회 에러:", error);
    return null;
  }
}

// 5. 오너먼트 이미지 업로드
// POST /api/ornaments/images
// Request: { image: string } (data URL or binary base64)
// Response: { body: { url: string } }
export async function uploadOrnamentImage(
  dataUrl: string,
): Promise<string | null> {
  try {
    // convert data URL to Blob
    const [meta, base64] = dataUrl.split(",");
    const mimeMatch = meta.match(/data:(.*);base64/);
    const mime = mimeMatch?.[1] ?? "image/png";
    const binary = atob(base64 || "");
    const len = binary.length;
    const u8 = new Uint8Array(len);
    for (let i = 0; i < len; i++) u8[i] = binary.charCodeAt(i);
    const blob = new Blob([u8], { type: mime });

    const fd = new FormData();
    fd.append(
      "image",
      blob,
      `ornament-${Date.now()}.${mime.split("/")[1] || "png"}`,
    );

    const res = await apiFetch(`/api/ornaments/images`, {
      method: "POST",
      body: fd,
    });

    if (!res.ok) {
      console.error("오너먼트 이미지 업로드 실패", res);
      return null;
    }

    const data = await res.json();
    // backend returns image URL in body.imgUrl
    return data?.body?.imgUrl ?? data?.body?.url ?? null;
  } catch (error: any) {
    console.error("오너먼트 이미지 업로드 에러:", error);
    return null;
  }
}

export async function getTreeOwnerInLetter(uuid: string) {
  try {
    const res = await fetch(`/api/trees/${uuid}`, {
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
