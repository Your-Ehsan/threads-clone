import ThreadCard from "@/src/components/cards/ThreadCard";
import { fetchThreads } from "@/src/lib/actions/threads.actions";
import { UserButton, currentUser } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

const Home = async () => {
  const { isNext, _threads } = await fetchThreads(),
    _user = await currentUser();

  console.log(_threads);

  return (
    <section>
      <UserButton
        appearance={{
          baseTheme: dark,
          elements: {
            organizationSwitcherTrigger: "py-2 px-4",
          },
        }}
        afterSignOutUrl="/"
      />
      {_threads.length === 0 ? (
        <div>No Threads found ¯\_(ツ)_/¯ </div>
      ) : (
        _threads.map((_thread, index) => {
          return (
            <ThreadCard
              key={index}
              id={_thread._id}
              currentUserId={_user?.id || ""}
              parentId={_thread.parentId}
              content={_thread.text}
              author={_thread.author}
              community={_thread.community}
              createdAt={_thread.createdAt}
              comments={_thread.children}
            />
          );
        })
      )}
    </section>
  );
};
export default Home;
