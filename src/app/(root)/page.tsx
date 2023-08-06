//app/page.tsx
// "use client";
import { fetchThreads } from "@/src/lib/actions/threads.actions";
import { UserButton } from "@clerk/nextjs";
// import { useEffect } from "react";

const Home = async () => {
  const _threads = await fetchThreads(1 , 2)
  // useEffect(() => {
  //   (async () => await fetchThreads())();
  // }, []);

  console.log(_threads);

  return (
    <section>
      <UserButton afterSignOutUrl="/" />
    </section>
  );
};
export default Home;
