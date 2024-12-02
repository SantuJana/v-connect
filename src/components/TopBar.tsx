import React from "react";
import { IoEllipsisVertical, IoNotificationsOutline } from "react-icons/io5";
import { HiMenuAlt2 } from "react-icons/hi";

export default function TopBar() {
  return (
    <div className="h-14 sm:h-16 w-full px-3 sm:px-4 shadow-md flex justify-between items-center">
      <div className="flex items-center gap-2">
        <HiMenuAlt2 className="text-xl flex sm:hidden text-violet-800"/>
        <h3 className="text-violet-700 font-medium sm:text-xl text-pretty">
          Hi, Santu Jana
        </h3>
      </div>
      <div className="flex items-center gap-3">
        <h3 className="text-violet-700 text-lg sm:text-2xl font-semibold sm:font-bold">
          Vconnect
        </h3>
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search"
          className="hidden sm:flex px-5 py-2 rounded-full outline-violet-700 text-slate-700 shadow-md"
        />
        <IoNotificationsOutline className="text-2xl sm:text-3xl text-slate-700 cursor-pointer" />
        <IoEllipsisVertical className="text-2xl sm:text-3xl text-slate-700 cursor-pointer" />
      </div>
    </div>
  );
}
