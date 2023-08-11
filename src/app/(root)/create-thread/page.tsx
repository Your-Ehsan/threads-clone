import PostThread from "@/src/components/forms/PostThread";
import { fetchUser } from "@/src/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const CreateThread = async (): Promise<JSX.Element> => {
  const _user = await currentUser(),
    _userInfo = await fetchUser(_user?.id);

  // fetch organization list created by user
  if (!_userInfo?.onboarded) redirect("/onboarding");

  return (
    <section>
      <h1 className="head-text">Create Thread</h1>

      <PostThread userId={_userInfo._id} />
    </section>
  );
};

export default CreateThread;
