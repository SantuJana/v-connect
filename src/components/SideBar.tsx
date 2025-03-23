import React from "react";
import Logo from "../assets/icon.png";
// import Avatar from "../assets/avatar-image.png";
import {
  IoSettingsOutline,
  IoChatbubblesOutline,
  IoHeart,
  IoPerson,
} from "react-icons/io5";
import Tooltip from "./Tooltip";
import { Link, NavLink } from "react-router-dom";
import useUserStore from "../store/user.store";
import { imagekitEndpoint } from "../constants";

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
        <NavLink to={"/favorites"}>
          <Tooltip text="Favorite">
            <IoHeart size={40} className="fill-red-600 cursor-pointer" />
          </Tooltip>
        </NavLink>
        <NavLink to={"/chats"}>
          <Tooltip text="Chats">
            <IoChatbubblesOutline
              size={40}
              className="text-sky-600 cursor-pointer"
            />
          </Tooltip>
        </NavLink>
        <NavLink to={"/settings"}>
          <Tooltip text="Settings">
            <IoSettingsOutline
              size={40}
              className="text-slate-600 cursor-pointer"
            />
          </Tooltip>
        </NavLink>
        <NavLink to={"/profile"}>
          <figure className="w-12 h-12 rounded-full overflow-hidden flex justify-center items-center ring-2 ring-offset-1 ring-violet-400 cursor-pointer">
            {user.image ? (
              <img src={`${imagekitEndpoint}${user.image}?tr=h-96,w-96`} alt="avatar" className="w-full h-full" />
            ) : (
              <IoPerson className="w-full h-full bg-violet-300" />
            )}
          </figure>
        </NavLink>
      </div>
    </div>
  );
}
