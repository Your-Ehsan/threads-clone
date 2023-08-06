// Constants

const sidebarLinks: {
    imgURL: string;
    route: string;
    label: string;
  }[] = [
    {
      imgURL: "/assets/home.svg",
      route: "/",
      label: "Home",
    },
    {
      imgURL: "/assets/search.svg",
      route: "/search",
      label: "Search",
    },
    {
      imgURL: "/assets/heart.svg",
      route: "/activity",
      label: "Activity",
    },
    {
      imgURL: "/assets/create.svg",
      route: "/create-thread",
      label: "Create Thread",
    },
    {
      imgURL: "/assets/community.svg",
      route: "/communities",
      label: "Communities",
    },
    {
      imgURL: "/assets/user.svg",
      route: "/profile",
      label: "Profile",
    },
  ],
  profileTabs: {
    value: string;
    label: string;
    icon: string;
  }[] = [
    { value: "threads", label: "Threads", icon: "/assets/reply.svg" },
    { value: "replies", label: "Replies", icon: "/assets/members.svg" },
    { value: "tagged", label: "Tagged", icon: "/assets/tag.svg" },
  ],
  communityTabs: {
    value: string;
    label: string;
    icon: string;
  }[] = [
    { value: "threads", label: "Threads", icon: "/assets/reply.svg" },
    { value: "members", label: "Members", icon: "/assets/members.svg" },
    { value: "requests", label: "Requests", icon: "/assets/request.svg" },
  ],
  meta: {
    title: string;
    description: string;
  } = {
    title: "Thre@ds | Clone",
    description: "Threads clone using next 13 and Clerk authentication",
  },
  MongoDB_URL: string = process.env.MONGO_DB_CONNECTION_STRING || '';
export { meta, communityTabs, profileTabs, sidebarLinks, MongoDB_URL };
