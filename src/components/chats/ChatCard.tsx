import React from "react";
import GirlImage from "../../assets/female/icons8-female-90.svg";
import { Chat } from "../../pages/Chats";
import getProfileImageName from "../../utils/getProfileImageName";
import { imagekitEndpoint } from "../../constants";
import moment from "moment";
import formatChatTime from "../../utils/formatChatTime";

interface ChatCardProps {
  chat: Chat;
  onSelectChat: (chat: Chat) => void;
}

export default function ChatCard({ chat, onSelectChat }: ChatCardProps) {
  return (
    <div
      className="flex h-fit gap-3 w-full md:w-[400px] hover:bg-violet-100 md:bg-slate-50 p-3 md:p-3 md:shadow md:rounded cursor-pointer"
      onClick={() => onSelectChat(chat)}
    >
      <div className="flex-shrink-0">
        {chat.image ? (
          <img
            src={`${imagekitEndpoint}${chat.image}?tr=h-100,w-100`}
            alt=""
            className="object-contain rounded-full w-14 h-14 bg-violet-200"
          />
        ) : (
          <div className="rounded-full w-14 h-14 bg-violet-200 flex justify-center items-center text-violet-700 text-lg font-bold">
            {getProfileImageName(chat.name)}
          </div>
        )}
      </div>
      <div className="flex-grow flex flex-col">
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold text-violet-800">{chat.name}</p>
          <p className="text-xs text-slate-500">{formatChatTime(chat.createdAt)}</p>
        </div>
        <p className="text-sm text-violet-600">
          {chat.fromYou ? "You: " : ""}
          {chat.message && chat.message?.length > 40
            ? chat.message?.substring(0, 39) + "..."
            : chat.message}
        </p>
      </div>
    </div>
  );
}
