import { fetchUser, getActivity } from "@/src/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const Activity = async () => {
  const _user = await currentUser(),
    _userInfo = await fetchUser(_user?.id),
    Activity = await getActivity(_userInfo._id);

  if (!_user) return null;
  if (!_userInfo.onboarded) redirect("/onboarding");

  return (
    <section>
      <h1 className="head-text mb-10">Activity</h1>
      <div className="mt-10 flex flex-col gap-5">
        {Activity.length > 0 ? (
          <div>
            {Activity.map((activity) => (
              <Link key={activity._id} href={`/thread/${activity.parentId}`}>
                <article className="activity-card">
                  <Image
                    src={activity.author.image}
                    alt="user_logo"
                    width={20}
                    height={20}
                    className="rounded-full object-cover"
                  />
                  <p className="!text-small-regular text-light-1">
                    <span className="mr-1 text-primary-500">
                      {activity.author.name}
                    </span>
                    &nbsp;replied to your thread
                  </p>
                </article>
              </Link>
            ))}
          </div>
        ) : (
          <p className="!text-base-regular text-light-3">No activity yet</p>
        )}
      </div>
    </section>
  );
};

export default Activity;
