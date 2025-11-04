import React from "react";
import ChatAreaHeader from "./ChatAreaHeader";
import Message from "./Message";

const ChatSectionArea = () => {
  return (
    <div className="p-4 border rounded-xl h-full flex flex-col ">
      <ChatAreaHeader />
      <div className="flex-1 ">
        <Message />
      </div>
    </div>
  );
};

export default ChatSectionArea;
