import React, { useCallback, useEffect, useState } from "react";
import ChatCard from "../components/chats/ChatCard";
import MessageContainer from "../components/chats/MessageContainer";
import { useQuery } from "@tanstack/react-query";
import { getChatList } from "../service/chat.service";
import { LoaderContextType, useLoaderContext } from "../context/loaderContext";

export interface Chat {
  _id: string;
  name: string;
  image?: string | null;
  message: string | null;
  fromYou: boolean,
  createdAt: Date
}

export default function Chats() {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const { showLoader, hideLoader } = useLoaderContext() as LoaderContextType;

  const { data, isLoading } = useQuery({
    queryKey: ["chats"],
    queryFn: getChatList,
  });

  const handleChatSelect = useCallback(
    (chat: Chat) => {
      setSelectedChat(chat);
    },
    [setSelectedChat]
  );

  const handleDeselectChat = useCallback(() => {
    setSelectedChat(null);
  }, [setSelectedChat]);

  useEffect(() => {
    if (isLoading) showLoader();
    else hideLoader();
  }, [isLoading, showLoader, hideLoader]);

  return (
    <div className="flex w-full mt-2">
      <div
        className={`flex h-full divide-y md:divide-y-0 divide-violet-200 flex-grow-0 overflow-y-auto flex-col md:gap-3 pb-4 w-full ${
          selectedChat
            ? "md:flex-col pr-4 md:w-auto md:flex-shrink-0"
            : "md:flex-row md:flex-wrap"
        }`}
      >
        {data?.data?.data?.map((chat: Chat, index: number) => (
          <ChatCard key={index} chat={chat} onSelectChat={handleChatSelect} />
        ))}
      </div>
      {selectedChat && (
        <MessageContainer
          selectedChat={selectedChat}
          handleDeselectChat={handleDeselectChat}
        />
      )}
    </div>
  );
}
