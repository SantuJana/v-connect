import React, { useCallback, useEffect, useState } from "react";
import {
  IoReload,
} from "react-icons/io5";
import UserCard from "../components/UserCard";
import api from "../utils/axiosInstance";
import { apiUrl } from "../constants";

export interface UserInterface {
  _id: string;
  name: string;
  email: string;
  dob: Date;
  image?: string;
  city?: string;
}

export default function Home() {
  const [userList, setUserList] = useState<UserInterface[]>([]);

  const fetchUserList = useCallback(async () => {
    try {
      const response = await api.get(`${apiUrl}/user/list`);
      setUserList(response?.data?.data || []);
    } catch (error) {}
  }, [setUserList]);

  useEffect(() => {
    fetchUserList();
  }, [fetchUserList]);

  return (
    <>
      {/* User section */}
      <div className="w-full">
        <div className="p-1 sm:p-2">
          <p className="text-md sm:text-lg text-violet-700 font-semibold">
            Recent
          </p>
        </div>
        <div className="p-1 sm:p-2 grid sm:flex gap-4 grid-cols-2 sm:flex-wrap">
          {[...Array(5)].map((_, index: number) => (
            <UserCard key={index} />
          ))}
        </div>
        <div className="p-1 sm:p-2 flex gap-2 items-center">
          <p className="text-md sm:text-lg text-violet-700 font-semibold">
            Suggested
          </p>
          <IoReload className="text-lg sm:text-2xl text-violet-700 cursor-pointer" />
        </div>
        <div className="p-1 sm:p-2 grid sm:flex gap-4 grid-cols-2 sm:flex-wrap pb-4">
          {userList.map((user, index: number) => (
            <UserCard key={index} user={user} />
          ))}
        </div>
      </div>
      {/* Notice and add section */}
      <div className="hidden sm:flex justify-center items-center p-8">
        <div className="ring-2 ring-violet-300 rounded-lg shadow-lg w-52 min-h-[80%] bg-slate-100"></div>
      </div>
    </>
  );
}
