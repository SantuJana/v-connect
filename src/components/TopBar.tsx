import React from "react";
import { IoEllipsisVertical, IoNotificationsOutline } from "react-icons/io5";

export default function TopBar() {
  return (
    <div className="h-16 w-full px-4 shadow-md flex justify-between items-center">
      <h3 className="text-violet-700 font-medium text-xl">Hi, Santu Jana</h3>
      <div className="flex items-center gap-3">
        <h3 className="text-violet-700 text-2xl font-bold">Vconnect</h3>
        <input type="text" name="search" id="search" placeholder="Search" className="px-5 py-2 rounded-full outline-violet-700 text-slate-700 shadow-md" />
        <IoNotificationsOutline size={30} className="text-slate-700 cursor-pointer" />
        <IoEllipsisVertical size={30} className="text-slate-700 cursor-pointer" />
      </div>
    </div>
  );
}
