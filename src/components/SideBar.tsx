import React from "react";
import Logo from "../assets/icon.png";
// import Avatar from "../assets/avatar-image.png";
import {
  IoSettingsOutline,
  IoChatbubblesOutline,
  IoHeart,
  IoPerson,
} from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import useUserStore from "../store/user.store";
import { imagekitEndpoint } from "../constants";
import { MdOutlineSupervisorAccount } from "react-icons/md";

export default function SideBar() {
  const { user } = useUserStore();
  return (
    <div className="h-full w-20 shrink-0 py-5 bg-white hidden sm:flex flex-col justify-between items-center shadow-lg overflow-hidden">
      <figure>
        <Link to={"/landing"}>
          <img src={Logo} alt="logo" className="w-12 h-11" />
        </Link>
      </figure>
      <div className="flex flex-col items-center gap-7">
        <NavLink to={"/friends"} className="flex flex-col justify-center items-center text-sm text-slate-500">
          <MdOutlineSupervisorAccount
            size={40}
            className="fill-blue-600 cursor-pointer"
          />
          Friends
        </NavLink>
        {/* <NavLink to={"/favorites"} className="flex flex-col justify-center items-center text-sm text-slate-500">
            <IoHeart size={40} className="fill-red-600 cursor-pointer" />
            Favorite
        </NavLink> */}
        <NavLink to={"/chats"} className="flex flex-col justify-center items-center text-sm text-slate-500">
            <IoChatbubblesOutline
              size={40}
              className="text-sky-600 cursor-pointer"
            />
            Chats
        </NavLink>
        <NavLink to={"/settings"} className="flex flex-col justify-center items-center text-sm text-slate-500">
            <IoSettingsOutline
              size={40}
              className="text-slate-600 cursor-pointer"
            />
            Settings
        </NavLink>
        <NavLink to={"/profile"}>
          <figure className="w-12 h-12 rounded-full overflow-hidden flex justify-center items-center ring-2 ring-offset-1 ring-violet-400 cursor-pointer">
            {user.image ? (
              <img
                src={`${imagekitEndpoint}${user.image}?tr=h-96,w-96`}
                alt="avatar"
                className="w-full h-full"
              />
            ) : (
              <IoPerson className="w-full h-full bg-violet-300" />
            )}
          </figure>
        </NavLink>
      </div>
    </div>
  );
}
