import React from "react";
import SideBar from "../components/SideBar";
import TopBar from "../components/TopBar";
import { IoReload } from "react-icons/io5";
import UserCard from "../components/UserCard";

export default function Home() {
  return (
    <div className="h-screen w-screen bg-violet-100 flex">
      <SideBar />
      <div className="w-full flex flex-col">
        <TopBar />
        <div className="h-full w-full p-2 overflow-y-auto">
          <div className="p-2">
            <p className="text-lg text-violet-700 font-semibold">Recent</p>
          </div>
          <div className="p-2 flex gap-4 flex-wrap">
            {[...Array(5)].map((_, index: number) => (
              <UserCard key={index} />
            ))}
          </div>
          <div className="p-2 flex gap-2 items-center">
            <p className="text-lg text-violet-700 font-semibold">Suggested</p>
            <IoReload size={20} className="text-violet-700 cursor-pointer" />
          </div>
          <div className="p-2 flex gap-4 flex-wrap">
            {[...Array(12)].map((_, index: number) => (
              <UserCard key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
