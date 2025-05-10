import React, { useState } from "react";
import FromMessage from "./FromMessage";
import ToMessage from "./ToMessage";

export interface MessageInterface {
  from?: boolean;
  to?: boolean;
  message: string;
  timestamp?: Date;
}

const initMessages = [
  {
    from: true,
    message: "Hello buddy!",
  },
  {
    to: true,
    message: "Hi mr.",
  },
  {
    from: true,
    message: "How are you?",
  },
  {
    to: true,
    message:
      "I am just looking for a cup of tea, can you give me a cup of tea it will be my pleasure",
  },
  {
    from: true,
    message: "I am just looking for a cup of tea, can you give me a cup of tea it will be my pleasure",
  },
];

export default function MessageViewContainer() {
  const [messages, setMessages] = useState<MessageInterface[]>(initMessages);
  return (
    <div className="flex-grow flex flex-col justify-end gap-2 p-2">
      {messages.map((message, index) =>
        message.from ? <FromMessage message={message} /> : <ToMessage message={message} />
      )}
    </div>
  );
}
