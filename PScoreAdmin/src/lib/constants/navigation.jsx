import { HiOutlineViewGrid } from "react-icons/hi";
import {
  PiClockCounterClockwiseDuotone,
  PiCourtBasketballLight,
} from "react-icons/pi";
import { IoCalendarOutline } from "react-icons/io5";
import { BsClock, BsEnvelopePaper } from "react-icons/bs";
import { FaRegNewspaper } from "react-icons/fa6";
import { CiSettings } from "react-icons/ci";
import { IoLogOutOutline } from "react-icons/io5";
import Reservations from "../../components/Admin/Reservations";
import AddStadium from "../../components/Admin/AddStadium";
import PlayGroundData from "../../components/Admin/PlayGroundData";
import AddMatches from "../../components/Admin/AddMatches";
import Matches from "../../components/Admin/Matches";
import AddNews from "../../components/Admin/AddNews";
import PlayGrounds from "../../components/Admin/PlayGrounds";
import News from "../../components/Admin/News";

export const SidebarTopData = [
  {
    key: "dashboard",
    label: "dashboard",
    path: "",
    curruntPath: "/admin",
    icon: <HiOutlineViewGrid />,
    component: <PlayGrounds />,
  },
  {
    key: "reservations",
    label: "reservations",
    path: "reservations",
    curruntPath: "/admin/reservations",
    icon: <IoCalendarOutline />,
    component: <Reservations />,
  },
  {
    key: "Matches",
    label: "Matches",
    path: "Matches",
    curruntPath: "/admin/Matches",
    icon: <IoCalendarOutline />,
    component: <Matches />,
  },
  {
    key: "news",
    label: "news",
    path: "news",
    curruntPath: "/admin/news",
    icon: <FaRegNewspaper />,
    component: <News />,
  },
  {
    key: "addNews",
    label: "addNews",
    path: "addNews",
    curruntPath: "/admin/addNews",
    icon: <FaRegNewspaper />,
    component: <AddNews />,
  },
  {
    key: "addMatches",
    label: "addMatches",
    path: "addMatches",
    curruntPath: "/admin/addMatches",
    icon: <BsClock />,
    component: <AddMatches />,
  },
  // {
  //   key: "playgroundData",
  //   label: "playgroundData",
  //   path: "playgroundData",
  //   curruntPath: "/Admin/playgroundData",
  //   icon: <PiCourtBasketballLight />,
  //   component: <PlayGroundData />,
  // },
  {
    key: "addStadium",
    label: "addStadium",
    path: "addStadium",
    curruntPath: "/admin/addStadium",
    icon: <PiCourtBasketballLight />,
    component: <AddStadium />,
  },
];

export const SidebarBottomData = [
  {
    key: "settings",
    label: "settings",
    path: "settings",
    icon: <CiSettings />,
    component: <Reservations />,
  },
  {
    key: "logout",
    label: "logout",
    path: "logout",
    icon: <IoLogOutOutline />,
    component: <Reservations />,
  },
];
