import React from "react";
import { IoIosFootball } from "react-icons/io";
import { SidebarBottomData, SidebarTopData } from "../lib/constants/navigation";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";
export default function Sidebar() {
  const { type } = useAuth();
  return (
    <div className="p-3 bg-green-800 w-60 flex flex-col text-white">
      <div className="flex-1">
        <div className="flex flex-row items-center gap-1">
          <IoIosFootball size={24} />
          <span className="text-lg">PScore</span>
        </div>
        <div className="flex flex-col pt-6 space-y-1">
          {SidebarTopData.map((item, index) => {
            if (
              (item.key === "addStadium" || item.key === "addNews") &&
              type !== "admin"
            ) {
              return null; // Skip rendering the addMatches link if user is not admin
            } else if (
              (item.key === "addMatches" ||
                item.key === "News" ||
                item.key === "Matches" ||
                item.key === "reservations") &&
              type !== "owner"
            ) {
              return null;
            } else {
              return <SidebarLink key={index} item={item} />;
            }
          })}
        </div>
      </div>
      <div className="flex flex-col space-y-1">
        {SidebarBottomData.map((item, index) => (
          <SidebarLink key={index} item={item} />
        ))}
      </div>
    </div>
  );
}
function SidebarLink({ item }) {
  const { pathname } = useLocation();

  let dd =
    pathname == item.curruntPath ? "bg-white/20 text-white" : "text-slate-300";

  return (
    <Link
      to={item.path}
      className={`flex items-center font-normal hover:bg-white/20 hover:text-white  py-2 px-1 gap-1 ${dd}`}
    >
      {item.icon}
      <span>{item.label}</span>
    </Link>
  );
}
