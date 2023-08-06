import AccountProfile from "@/src/components/forms/AccountProfile";
import { currentUser } from "@clerk/nextjs";

const Onboarding = async () => {
  const _user = await currentUser(),
    _userInfo = {},
    _userData = {
      id: _user?.id,
      objectId: _userInfo?._id,
      username: _user?.username || _userInfo?.username,
      name: _user?.firstName || _userInfo?.firstname || "",
      bio: _userInfo?.bio || "",
      image: _user?.imageUrl || _userInfo?.image,
    };

  return (
    <main className="flex flex-col max-w-3xl justify-center mx-auto mt-10">
      <h1 className="head-text">Onboarding</h1>
      <p className="mt-3 text-base-regular text-light-2">
        Complete Your profiles to use Threads
      </p>
      <section className="mt-9 bg-dark-2 p-10">
        <AccountProfile user={_userData} btnTitle="continue" />
      </section>
    </main>
  );
};

export default Onboarding;
