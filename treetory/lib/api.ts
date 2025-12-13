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

// 장식 조회 API (추후 구현 예정)
// =======================================
// Method: GET
// URL: /api/ornaments?word={word}&category={category}&page={page}
// 
// Query Parameters:
//   - word (string): 검색어 (선택사항)
//   - category (string): 카테고리 (선택사항)
//   - page (number): 페이지 번호 (선택사항, 기본값: 0)
//
// Response Schema:
// {
//   "header": {
//     "message": "OK"
//   },
//   "body": {
//     "ornaments": {
//       "content": [
//         {
//           "ornamentId": 1,
//           "name": "string",
//           "imgUrl": "string"
//         }
//       ],
//       "pageNum": 0,
//       "pageSize": 18,
//       "totalPage": 1,
//       "totalElements": 1
//     }
//   }
// }
//
// Ornament Interface:
// export interface Ornament {
//   ornamentId: number;
//   name: string;
//   imgUrl: string;
// }
//
// OrnamentResponse Interface:
// export interface OrnamentResponse {
//   ornaments: {
//     content: Ornament[];
//     pageNum: number;
//     pageSize: number;
//     totalPage: number;
//     totalElements: number;
//   };
// }
//
// Usage Example:
// export async function getOrnaments(
//   word: string = '',
//   category: string = '',
//   page: number = 0
// ): Promise<OrnamentResponse | null> {
//   const params = new URLSearchParams();
//   if (word) params.append('word', word);
//   if (category) params.append('category', category);
//   if (page > 0) params.append('page', page.toString());
//
//   const url = `${BASE_URL}/api/ornaments?${params.toString()}`;
//   const res = await apiFetch(url);
//
//   if (!res.ok) return null;
//   return await res.json();
// }
// =======================================
