import { apiFetch } from "./api";

export async function toggleBookmakApi({
  targetMemberId,
  isBookmarked,
}: {
  targetMemberId: string;
  isBookmarked: boolean;
}) {
  const method = isBookmarked ? "DELETE" : "POST";
  try {
    const res = await apiFetch(`/api/members/bookmarks/${targetMemberId}`, {
      method: method,
      credentials: "include",
    });

    // 즐겨찾기 추가, 즐겨찾기 삭제 성공
    if (res.status === 201 || res.status === 204) {
      return true;
    }

    // 실패
    console.error("북마크 API 실패", res.status);
    return false;
  } catch (error) {
    console.error("api 응답 실패", error);
    return false;
  }
}
