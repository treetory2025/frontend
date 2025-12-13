import { useRouter } from "next/navigation";

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
  const router = useRouter();
  return (
    <div className="my-8 flex flex-col gap-2">
      {members.map((member) => (
        <div
          key={member.memberId}
          className="flex h-full items-start justify-between px-2 py-2"
        >
          <div className="flex flex-col gap-1">
            <p className="text-body text-navy font-bold">{member.nickname}</p>
            <p className="text-caption text-muted-navy">{member.email}</p>
          </div>
          <button
            className="bg-green text-beige cursor-pointer rounded-full px-4 py-1"
            onClick={() => router.push(`/tree/${member.memberId}`)}
          >
            방문하기
          </button>
        </div>
      ))}
    </div>
  );
}
