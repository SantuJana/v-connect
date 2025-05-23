import React from "react";
import Avatar from "../assets/icon.png";
import {
  IoHome,
  IoSettingsOutline,
  IoChatbubblesOutline,
  IoHeart,
  IoPersonCircleOutline,
  IoClose,
} from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { AppContext, useApp } from "../context/appContext";
import useUserStore from "../store/user.store";
import { imagekitEndpoint } from "../constants";
import { MdOutlineSupervisorAccount } from "react-icons/md";

interface DrawerProps {
  visibility: boolean;
  toggle: () => void;
}

export default function Drawer({ visibility, toggle }: DrawerProps) {
  const { toggleDrawer } = useApp() as AppContext;
  const { user } = useUserStore();

  return (
    <>
      <div
        className={`absolute right-0 bottom-0 top-0 left-0 bg-slate-50 z-10 bg-opacity-5 backdrop-blur-sm transition-all ease-in-out duration-200 ${
          visibility ? "flex" : "hidden"
        }`}
      />
      <div
        className={`absolute top-0 bottom-0 left-0 w-72 bg-slate-100 shadow-md flex flex-col transition-transform duration-200 ease-in-out z-10 ${
          visibility ? "translate-x-0" : "-translate-x-72"
        }`}
      >
        <div
          onClick={toggle}
          className="relative h-36 w-full bg-violet-300 flex flex-col justify-center items-center py-5 px-2 "
        >
          <IoClose
            size={25}
            className="absolute top-2 right-2 text-violet-700 transition-transform duration-200 ease-in-out hover:rotate-90"
          />
          <figure className="ring-2 ring-offset-2 ring-violet-400 rounded-full overflow-hidden h-16 w-16 flex justify-center items-center">
            <img
              src={user?.image ? imagekitEndpoint + user?.image + "?tr=h-200,w-200" : Avatar}
              className=""
              alt=""
              height={"100%"}
              width={"100%"}
            />
          </figure>
          <h3 className="text-violet-700 font-semibold mt-2">{user?.name || "Hello!"}</h3>
        </div>
        <div className="flex-1 px-3 pt-5">
          <ul className="flex flex-col gap-2">
            <NavLink
              to={"/landing"}
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 ${
                  isActive
                    ? "text-violet-200 bg-violet-700 rounded-lg"
                    : "text-violet-700 hover:text-violet-200 hover:bg-violet-700 hover:rounded-lg"
                }`
              }
              onClick={toggleDrawer}
            >
              <IoHome size={20} />
              <p className="font-medium">Home</p>
            </NavLink>
            <NavLink
              to={"/friends"}
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 ${
                  isActive
                    ? "text-violet-200 bg-violet-700 rounded-lg"
                    : "text-violet-700 hover:text-violet-200 hover:bg-violet-700 hover:rounded-lg"
                }`
              }
              onClick={toggleDrawer}
            >
              <MdOutlineSupervisorAccount size={20} className="fill-blue-600" />
              <p className="font-medium">Friends</p>
            </NavLink>
            {/* <NavLink
              to={"/favorites"}
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 ${
                  isActive
                    ? "text-violet-200 bg-violet-700 rounded-lg"
                    : "text-violet-700 hover:text-violet-200 hover:bg-violet-700 hover:rounded-lg"
                }`
              }
              onClick={toggleDrawer}
            >
              <IoHeart size={20} className="fill-red-600" />
              <p className="font-medium">Favorites</p>
            </NavLink> */}
            <NavLink
              to={"/chats"}
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 ${
                  isActive
                    ? "text-violet-200 bg-violet-700 rounded-lg"
                    : "text-violet-700 hover:text-violet-200 hover:bg-violet-700 hover:rounded-lg"
                }`
              }
              onClick={toggleDrawer}
            >
              <IoChatbubblesOutline size={20} className="text-sky-600 " />
              <p className="font-medium">Messages</p>
            </NavLink>
            <NavLink
              to={"/settings"}
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 ${
                  isActive
                    ? "text-violet-200 bg-violet-700 rounded-lg"
                    : "text-violet-700 hover:text-violet-200 hover:bg-violet-700 hover:rounded-lg"
                }`
              }
              onClick={toggleDrawer}
            >
              <IoSettingsOutline size={20} className="text-slate-600" />
              <p className="font-medium">Settings</p>
            </NavLink>
            <NavLink
              to={"/profile"}
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 ${
                  isActive
                    ? "text-violet-200 bg-violet-700 rounded-lg"
                    : "text-violet-700 hover:text-violet-200 hover:bg-violet-700 hover:rounded-lg"
                }`
              }
              onClick={toggleDrawer}
            >
              <IoPersonCircleOutline size={20} className="text-blue-700" />
              <p className="font-medium">Profile</p>
            </NavLink>
          </ul>
        </div>
        <div className="text-center p-2 text-violet-700">
          copyright &copy; {new Date().getFullYear()} Santu Jana{" "}
          <span className="text-red-700">&#10084;</span>
        </div>
      </div>
    </>
  );
}
