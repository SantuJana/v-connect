import React from "react";
import { Chat } from "../../pages/Chats";
import MessageHeader from "./MessageHeader";
import MessageTypeBox from "./MessageTypeBox";
import MessageViewContainer from "./MessageViewContainer";

interface MessageContainer {
  selectedChat: Chat;
  handleDeselectChat: () => void;
}

export default function MessageContainer({ selectedChat, handleDeselectChat }: MessageContainer) {
  return <div className="absolute md:static md:rounded top-0 right-0 bottom-0 left-0 md:top-auto md:right-6 md:bottom-6 md:left-auto md:w-full overflow-hidden bg-slate-100 flex flex-col">
    <MessageHeader selectedChat={selectedChat} handleDeselectChat={handleDeselectChat} />
    <MessageViewContainer />
    <MessageTypeBox />
  </div>;
}
