import React from "react";
import { IoPerson, IoVideocamOffOutline } from "react-icons/io5";
import { imagekitEndpoint } from "../constants";
//@ts-ignore
import CallerTone from "../assets/caller.mp3";

interface CallerDialogProps {
  user: {
    image?: string;
    name: string;
    _id: string;
  };
  callStatus: string;
  handleVideoCallCancelClick: () => void;
  callerTuneRef: React.RefObject<HTMLAudioElement> | null;
}

export default function CallerDialog({
  user,
  callStatus,
  handleVideoCallCancelClick,
  callerTuneRef,
}: CallerDialogProps) {
  return (
    <div className="w-5/6 md:w-96 h-4/6 flex flex-col justify-between bg-white text-violet-600 rounded-xl shadow-lg absolute z-10 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 py-10">
      <div>
        <figure className="w-16 h-16 mx-auto rounded-full overflow-hidden flex justify-center items-center ring-2 ring-offset-1 ring-violet-400 cursor-pointer">
          {user?.image ? (
            <img
              src={`${imagekitEndpoint}${user.image}?tr=h-100,w-100`}
              alt="avatar"
              className="w-full h-full"
            />
          ) : (
            <IoPerson className="w-full h-full bg-violet-300" />
          )}
        </figure>
        <div className="text-center mt-3 font-bold">{user?.name}</div>
        <div
          className={`text-center ${
            callStatus === "Declined" ? "text-red-600" : "text-green-600"
          }`}
        >
          {callStatus}
        </div>
      </div>
      <div className="flex items-center justify-around">
        <div className="w-12 h-12 bg-red-700 rounded-full text-white flex justify-center items-center cursor-pointer">
          <IoVideocamOffOutline
            size={24}
            onClick={handleVideoCallCancelClick}
          />
        </div>
      </div>
      {/* Caller ring audio */}
      <audio
        ref={callerTuneRef}
        src={CallerTone}
        hidden
        autoPlay
        loop
        controls={false}
        aria-hidden
      ></audio>
    </div>
  );
}
