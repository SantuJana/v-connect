import React from "react";
import Avatar from "../assets/avatar-image.png";
import {
  IoHome,
  IoSettingsOutline,
  IoChatbubblesOutline,
  IoHeart,
  IoPersonCircleOutline,
  IoClose 
} from "react-icons/io5";

interface DrawerProps {
    visibility: boolean;
    toggle: () => void;
}

export default function Drawer({visibility, toggle}:DrawerProps) {
  return (
    <div className={`absolute top-0 bottom-0 right-0 left-0 bg-slate-300 z-10  transition-all duration-500 ease-in-out ${visibility ? "bg-opacity-0 backdrop-blur-none hidden" : "bg-opacity-10 backdrop-blur-sm"}`}>
      <div className={`absolute top-0 bottom-0 left-0 w-72 bg-slate-100 shadow-md flex flex-col transition-transform duration-500 ease-in-out ${visibility ? "-translate-x-72" : "translate-x-0"}`}>
        <div onClick={toggle} className="relative h-36 w-full bg-violet-300 flex flex-col justify-center items-center py-5 px-2 ">
            <IoClose size={25} className="absolute top-2 right-2 text-violet-700 transition-transform duration-500 ease-in-out hover:rotate-90" />
          <figure className="ring-2 ring-offset-2 ring-violet-400 rounded-full overflow-hidden h-12 w-12 flex justify-center items-center">
            <img src={Avatar} className="" alt="" />
          </figure>
          <h3 className="text-violet-700 font-semibold ">Santu Jana {visibility}</h3>
        </div>
        <div className="flex-1 px-3 pt-5">
          <ul className="flex flex-col gap-2">
            <li className="flex items-center gap-2 p-2 rounded-lg text-violet-200 bg-violet-700">
              <IoHome size={20} />
              <p className="font-medium">Home</p>
            </li>
            <li className="flex items-center gap-2 p-2 text-violet-700 hover:text-violet-200 hover:bg-violet-700 hover:rounded-lg">
              <IoHeart size={20} className="fill-red-600" />
              <p className="font-medium">Favorites</p>
            </li>
            <li className="flex items-center gap-2 p-2 text-violet-700 hover:text-violet-200 hover:bg-violet-700 hover:rounded-lg">
              <IoChatbubblesOutline size={20} className="text-sky-600 " />
              <p className="font-medium">Messages</p>
            </li>
            <li className="flex items-center gap-2 p-2 text-violet-700 hover:text-violet-200 hover:bg-violet-700 hover:rounded-lg">
              <IoSettingsOutline size={20} className="text-slate-600"/>
              <p className="font-medium">Settings</p>
            </li>
            <li className="flex items-center gap-2 p-2 text-violet-700 hover:text-violet-200 hover:bg-violet-700 hover:rounded-lg">
              <IoPersonCircleOutline size={20} className="text-blue-700" />
              <p className="font-medium">Profile</p>
            </li>
          </ul>
        </div>
        <div className="text-center p-2 text-violet-700">
          copyright &copy; {new Date().getFullYear()} Santu Jana{" "}
          <span className="text-red-700">&#10084;</span>
        </div>
      </div>
    </div>
  );
}
