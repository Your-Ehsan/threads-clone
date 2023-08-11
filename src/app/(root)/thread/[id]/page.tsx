import ThreadCard from "@/src/components/cards/ThreadCard";
import Comment from "@/src/components/forms/Comment";
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
  // console.log(_threadDetails)
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
      <div className="mt-7">
        <Comment
          threadId={_threadDetails._id}
          currentUserImg={_CurrentUserInfo.image}
          currentUserId={_CurrentUserInfo._id}
        />
      </div>
      <div className="mt-10">
        {_threadDetails.children.map((_ChildThread: any) => {
          return (
            <ThreadCard
              key={_ChildThread._id}
              id={_ChildThread._id}
              currentUserId={_user?.id || ""}
              parentId={_ChildThread.parentId}
              content={_ChildThread.text}
              author={_ChildThread.author}
              community={_ChildThread.community}
              createdAt={_ChildThread.createdAt}
              comments={_ChildThread.children}
              isComment={true}
            />
          );
        })}
      </div>
    </section>
  );
};
/*
{
      _id: new ObjectId("64d4b2663daa524d91efb078"),
      text: 'nice 🤣 |  just a testing comment',
      author: [Object],
      parentId: '64d09fc8e5b7fd483c6db8f8',
      children: [],
      createdAt: 2023-08-10T09:48:22.660Z,
      __v: 0
    }
*/
export default ThreadDetails;
