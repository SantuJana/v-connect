import React from "react";
import { MessageInterface } from "./MessageViewContainer";

interface ToMessageProps {
  message: MessageInterface;
}

export default function ToMessage({ message }: ToMessageProps) {
  return <div className="w-auto max-w-[80%] md:max-w-[70%] bg-slate-200 px-2 py-1 rounded-lg rounded-bl-none text-slate-700 self-start">{message.message}</div>;
}
