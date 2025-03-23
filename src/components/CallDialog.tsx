import React, { useCallback } from "react";
import { imagekitEndpoint } from "../constants";
import {
  IoPerson,
  IoVideocamOffOutline,
  IoVideocamOutline,
} from "react-icons/io5";
import { Socket } from "socket.io-client";
import { User } from "../store/user.store";
//@ts-ignore
import RingTone from "../assets/ring.mp3";
import { useNavigate } from "react-router-dom";

interface CallDialogProps {
  user: {
    image?: string;
    name: string;
    _id: string;
  };
  setUser: (a: any) => void;
  socket: Socket | null;
  self: User;
  ringTuneRef: React.RefObject<HTMLAudioElement> | null;
  selfSocketRef: React.MutableRefObject<string | null>;
  guestSocketRef: React.MutableRefObject<string | null>;
}

export default function CallDialog({
  user,
  setUser,
  socket,
  self,
  ringTuneRef,
  selfSocketRef,
  guestSocketRef,
}: CallDialogProps) {
  const navigate = useNavigate();

  const handleVideoCallDeclineClick = useCallback(() => {
    user &&
      socket?.emit("video:call:decline", {
        from: self?._id,
        to: user?._id,
      });
    setUser(null);
    selfSocketRef.current = null;
    guestSocketRef.current = null;
  }, [user, setUser, socket, self?._id, selfSocketRef, guestSocketRef]);

  const handleVideoCallAccept = useCallback(() => {
    ringTuneRef?.current?.pause();
    socket?.emit("video:call:accept", { from: self._id, to: user._id });
    setUser(null);
    navigate(`/video-call?self=${btoa(selfSocketRef.current || "")}&guest=${btoa(guestSocketRef.current || "")}`);
  }, [socket, self._id, user, ringTuneRef, setUser, navigate, selfSocketRef, guestSocketRef]);

  return (
    <div className="w-56 h-48 mt-4 bg-white text-violet-600 rounded-xl shadow-lg absolute z-10 left-1/2 transform -translate-x-1/2 p-4">
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
      <div className="flex items-center justify-around mt-5">
        <div className="w-10 h-10 bg-red-700 rounded-full text-white flex justify-center items-center cursor-pointer">
          <IoVideocamOffOutline
            size={20}
            onClick={handleVideoCallDeclineClick}
          />
        </div>
        <div className="w-10 h-10 bg-green-700 rounded-full text-white flex justify-center items-center cursor-pointer animate-bounce">
          <IoVideocamOutline size={20} onClick={handleVideoCallAccept} />
        </div>
      </div>
      {/* Caller ring audio */}
      <audio
        ref={ringTuneRef}
        src={RingTone}
        hidden
        autoPlay
        loop
        controls={false}
        aria-hidden
      ></audio>
    </div>
  );
}
