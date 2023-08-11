import ProfileHeader from "@/src/components/shared/ProfileHeader";
import ThreadsTab from "@/src/components/shared/ThreadsTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import { profileTabs } from "@/src/constants";
import { fetchUser } from "@/src/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import { redirect } from "next/navigation";

const Profile = async ({ params }: { params: { id: string } }) => {
  const _user = await currentUser(),
    _userInfo = await fetchUser(params.id);

  !_user && null;
  // !_userInfo?.onboarded && redirect("/onboarding");
  return (
    <section>
      <ProfileHeader
        accountId={_userInfo.id}
        authUserId={_user?.id}
        name={_userInfo.name}
        username={_userInfo.username}
        imgUrl={_userInfo.image}
        bio={_userInfo.bio}
      />

<div className='mt-9'>
        <Tabs defaultValue='threads' className='w-full'>
          <TabsList className='tab'>
            {profileTabs.map((tab) => (
              <TabsTrigger key={tab.label} value={tab.value} className='tab'>
                <Image
                  src={tab.icon}
                  alt={tab.label}
                  width={24}
                  height={24}
                  className='object-contain'
                />
                <p className='max-sm:hidden'>{tab.label}</p>

                {tab.label === "Threads" && (
                  <p className='ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2'>
                    {_userInfo.threads.length}
                  </p>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
          {profileTabs.map((tab , index) => (
            <TabsContent
              key={`content-${tab.label}-${index}`}
              value={tab.value}
              className='w-full text-light-1'
            >
              {/* @ts-ignore */}
              <ThreadsTab
                currentUserId={_user?.id}
                accountId={_userInfo.id}
                accountType='User'
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default Profile;
