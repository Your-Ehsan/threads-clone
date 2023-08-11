import AccountProfile from "@/src/components/forms/AccountProfile";
import { fetchUser } from "@/src/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";

const Onboarding = async () => {
  const _user = await currentUser(),
    _userInfo = await fetchUser(_user?.id),
    _userData = {
      id: _user?.id,
      objectId: _userInfo?._id,
      username: _userInfo ? _userInfo?.username : _user?.username,
      name: _userInfo ? _userInfo?.name : _user?.firstName ?? "",
      bio: _userInfo ? _userInfo?.bio : "",
      image: _userInfo ? _userInfo?.image : _user?.imageUrl,
    };

  if (!_user) return null;

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
