import React from "react";
import { IoSend } from "react-icons/io5";

export default function MessageTypeBox() {
  return (
    <div className="h-20 w-full px-2 flex-shrink-0 flex items-center gap-3">
      <input
        type="text"
        name="message"
        id="message"
        className="focus:outline-none text-slate-800 px-4 py-3 rounded-full shadow flex-grow"
        placeholder="Message"
      />
      <div className="h-12 w-12 bg-violet-700 rounded-full flex justify-center items-center flex-shrink-0">
        <IoSend size={24} className="text-violet-100" />
      </div>
    </div>
  );
}
