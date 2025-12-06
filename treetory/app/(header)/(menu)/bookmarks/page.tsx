import ContentSection from "@/components/commons/ContentSection";
import PageHeading from "@/components/commons/PageHeading";
import SearchSection from "./SearchSection";
import BookmarksMembersList from "@/components/ui/menu/BookmarksMemberList";
import { bookmarksMembersMock } from "@/app/mock/bookmarkMembersMock";
import PaginationSection from "./PaginationSection";

export default function Page({
  searchParams,
}: {
  searchParams: { query?: string; page?: string };
}) {
  const query = searchParams.query || "";
  const page = Number(searchParams.page) || "1";

  //   api 연결 부분
  // const { content, totalPage } = await fetchBookmarks({ query, page });

  const mockBookmarks = bookmarksMembersMock.members.content;
  const totalPage = bookmarksMembersMock.members.totalPage;

  return (
    <>
      <PageHeading title="즐겨찾기" />
      <ContentSection className="space-y-6 md:space-y-10 md:p-10">
        <SearchSection />
        {mockBookmarks.length === 0 && <h1>즐겨찾기한 사용자가 없습니다.</h1>}

        <BookmarksMembersList members={mockBookmarks} />
        <PaginationSection
          page={Number(page)}
          totalPage={totalPage}
          query={query}
        />
      </ContentSection>
    </>
  );
}
