import React, { useCallback, useState } from "react";
import {
  IoEllipsisVertical,
  IoNotificationsOutline,
  IoLogOutOutline,
} from "react-icons/io5";
import { HiMenuAlt2 } from "react-icons/hi";
import useUserStore from "../store/user.store";
import { useNavigate } from "react-router-dom";

interface TopBarProps {
  toggleDrawer: () => void;
}

export default function TopBar({ toggleDrawer }: TopBarProps) {
  const [menuVisibility, setMenuVisibility] = useState<boolean>(false);
  const { user, clearUser } = useUserStore();

  const navigate = useNavigate();

  const handleToggleMenu = useCallback(() => {
    setMenuVisibility((prevData) => !prevData);
  }, [setMenuVisibility]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    clearUser();
    navigate("/login", { replace: true });
  };

  return (
    <div className="h-14 sm:h-16 w-full px-3 sm:px-4 shadow-md flex justify-between items-center">
      <div className="flex items-center gap-2">
        <HiMenuAlt2
          onClick={toggleDrawer}
          className="text-xl flex sm:hidden text-violet-800"
        />
        <h3 className="text-violet-700 font-medium sm:text-xl text-pretty">
          Hi, {user.name}
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
        <div className="relative">
          <IoEllipsisVertical
            onClick={handleToggleMenu}
            className="text-2xl sm:text-3xl text-slate-700 cursor-pointer"
          />
          <div
            className={`bg-slate-50 absolute w-32 h-auto right-2 top-10 rounded shadow-lg p-2 z-10 ${
              menuVisibility ? "flex" : "hidden"
            }`}
          >
            <ul className="flex flex-col justify-center w-full">
              <li
                className="flex items-center gap-2 p-1 hover:bg-slate-200 rounded cursor-pointer"
                onClick={handleLogout}
              >
                <IoLogOutOutline size={20} /> Logout
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
