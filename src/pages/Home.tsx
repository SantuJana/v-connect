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
        <div className="h-full w-full p-2 overflow-y-auto flex">
          {/* User section */}
          <div className="w-full">
            <div className="p-1 sm:p-2">
              <p className="text-md sm:text-lg text-violet-700 font-semibold">Recent</p>
            </div>
            <div className="p-1 sm:p-2 grid sm:flex gap-4 grid-cols-2 sm:flex-wrap">
              {[...Array(5)].map((_, index: number) => (
                <UserCard key={index} />
              ))}
            </div>
            <div className="p-1 sm:p-2 flex gap-2 items-center">
              <p className="text-md sm:text-lg text-violet-700 font-semibold">Suggested</p>
              <IoReload className="text-lg sm:text-2xl text-violet-700 cursor-pointer" />
            </div>
            <div className="p-1 sm:p-2 grid sm:flex gap-4 grid-cols-2 sm:flex-wrap pb-4">
              {[...Array(6)].map((_, index: number) => (
                <UserCard key={index} />
              ))}
            </div>
          </div>
          {/* Notice and add section */}
          <div className="hidden sm:flex justify-center items-center p-8">
              <div className="ring-2 ring-violet-300 rounded-lg shadow-lg w-52 min-h-[80%] bg-slate-100">

              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
