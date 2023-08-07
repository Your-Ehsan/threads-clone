import ThreadCard from "@/src/components/cards/ThreadCard";
import { fetchThreadById } from "@/src/lib/actions/threads.actions";
import { fetchUser } from "@/src/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const ThreadDetails = async ({ params }: { params: { id: string } }) => {
  const _threadDetails: any = await fetchThreadById(params.id),
    _user = await currentUser(),
    _CurrentUserInfo = await fetchUser(_user?.id);

  !params.id && null;
  !_user && null;
  !_CurrentUserInfo?.onboarded && redirect("/onboarding");

  return (
    <section>
      <div className="">
        <ThreadCard
          key={_threadDetails._id}
          id={_threadDetails._id}
          currentUserId={_user?.id || ""}
          parentId={_threadDetails.parentId}
          content={_threadDetails.text}
          author={_threadDetails.author}
          community={_threadDetails.community}
          createdAt={_threadDetails.createdAt}
          comments={_threadDetails.children}
        />
      </div>
    </section>
  );
};

export default ThreadDetails;
