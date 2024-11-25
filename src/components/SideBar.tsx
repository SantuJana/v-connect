import React from "react";
import Logo from "../assets/icon.png";
import Avatar from "../assets/avatar-image.png";
import {
  IoSettingsOutline,
  IoChatbubblesOutline,
  IoHeart,
} from "react-icons/io5";
import Tooltip from "./Tooltip";

export default function SideBar() {
  return (
    <div className="h-full w-20 shrink-0 py-5 bg-white flex flex-col justify-between items-center shadow-lg overflow-hidden">
      <figure>
        <img src={Logo} alt="logo" className="w-12 h-11" />
      </figure>
      <div className="flex flex-col items-center gap-7">
        <Tooltip text="Favorite">
          <IoHeart size={40} className="fill-red-600 cursor-pointer" />
        </Tooltip>
        <Tooltip text="Chats">
          <IoChatbubblesOutline
            size={40}
            className="text-sky-600 cursor-pointer"
          />
        </Tooltip>
        <Tooltip text="Settings">
          <IoSettingsOutline
            size={40}
            className="text-slate-600 cursor-pointer"
          />
        </Tooltip>
        <figure className="w-12 h-12 rounded-full overflow-hidden flex justify-center items-center ring-2 ring-offset-1 ring-violet-400 cursor-pointer">
          <img src={Avatar} alt="avatar" className="w-full h-full" />
        </figure>
      </div>
    </div>
  );
}
