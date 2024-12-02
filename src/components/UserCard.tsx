import React from "react";
import Avatar from "../assets/avatar-image.png";
import {
  IoCallOutline,
  IoVideocamOutline,
  IoChatboxOutline,
  IoHeart,
  IoHeartOutline,
} from "react-icons/io5";

export default function UserCard() {
  return (
    <div className="relative p-2 sm:p-3 bg-white border-1 border-violet-300 shadow-lg sm:w-72 min-h-32 rounded-lg">
      <div className="flex flex-col sm:flex-row gap-3 items-center sm:items-start w-full">
        <div>
          <figure className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-violet-400 flex justify-center items-center">
            <img src={Avatar} alt="avatar" className="w-full h-full" />
          </figure>
        </div>
        <div className="w-full text-center sm:text-start">
          <div className="flex items-start w-full">
            <p className="text-md sm:text-lg flex-1 text-violet-600 font-semibold leading-tight">
              Natasha Roy
            </p>
            <div className="absolute top-2 right-2 sm:flex justify-center items-center group">
                <IoHeart
                size={20}
                className="float-end cursor-pointer fill-red-600 hidden group-hover:flex"
                />
                <IoHeartOutline
                size={20}
                className="float-end cursor-pointer text-slate-600 flex group-hover:hidden"
                />

            </div>
          </div>
          <p className="text-violet-600 text-base sm:text-md leading-tight">26 years old</p>
          <p className="text-violet-600 text-base sm:text-md leading-tight">Kolkata</p>
        </div>
      </div>
      <div className="flex justify-center sm:justify-end gap-2 items-center mt-3">
        <div className="w-8 h-8 rounded-full bg-violet-500 border-1 border-violet-700 flex justify-center items-center text-white cursor-pointer order-3">
          <IoCallOutline size={17} />
        </div>
        <div className="w-8 h-8 rounded-full bg-blue-500 border-1 border-blue-700 flex justify-center items-center text-white cursor-pointer order-2">
          <IoVideocamOutline size={17} />
        </div>
        <div className="w-8 h-8 rounded-full bg-sky-500 border-1 border-sky-700 flex justify-center items-center text-white cursor-pointer order-1">
          <IoChatboxOutline size={17} />
        </div>
      </div>
    </div>
  );
}
