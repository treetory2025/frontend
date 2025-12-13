interface Member {
  memberId: string;
  nickname: string;
  email: string;
}

export default function BookmarksMembersList({
  members,
}: {
  members: Member[];
}) {
  return (
    <div className="my-8 flex flex-col gap-2">
      {members.map((member) => (
        <div
          key={member.memberId}
          className="flex h-full items-center justify-between px-2 py-2"
        >
          <div className="flex flex-col gap-1">
            <p className="text-body text-navy font-bold">{member.nickname}</p>
            <p className="text-caption text-muted-navy">{member.email}</p>
          </div>
          <div>
            <p className="text-body text-green font-bold">장식개수 00개</p>
            <button className="bg-muted-navy text-beige rounded-full px-4 py-1">
              방문하기
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
