export const sidebarLinks = [
  {
    imgURL: "/assets/home-gray.svg",
    route: "/",
    label: "Home",
  },
  {
    imgURL: "/assets/search-gray.svg",
    route: "/search",
    label: "Search",
  },
  /*{
    imgURL: "/assets/heart-gray.svg",
    route: "/activity",
    label: "Activity",
  },*/
  {
    imgURL: "/assets/create-gray.svg",
    route: "/create-post",
    label: "Create Post",
  },
  {
    imgURL: "/assets/share.svg",
    route: "/messenger",
    label: "Messenger",
  },
  {
    imgURL: "/assets/user-gray.svg",
    route: "/profile",
    label: "Profile",
  },
];

export const profileTabs = [
  { value: "threads", label: "Threads", icon: "/assets/reply.svg" },
  { value: "replies", label: "Replies", icon: "/assets/members.svg" },
  { value: "tagged", label: "Tagged", icon: "/assets/tag.svg" },
];

export const communityTabs = [
  { value: "threads", label: "Threads", icon: "/assets/reply.svg" },
  { value: "members", label: "Members", icon: "/assets/members.svg" },
  { value: "requests", label: "Requests", icon: "/assets/request.svg" },
];


//base url
export const BASE_URL = 'https://socialconnect.azurewebsites.net/api';
//export const HOME_URL = "https://social-connect-gr5b05c28-phoenix486.vercel.app/";
export const HOME_URL = "https://social-connect-gr5b05c28-phoenix486.vercel.app/";
