"use client";
import React from "react";
import ChatAreaHeader from "./ChatAreaHeader";
import Message from "./Message";
import { ChatSectionAreaProps } from "@/types/chat";




const ChatSectionArea: React.FC<ChatSectionAreaProps> = ({
   selectedUser,
  loggedInUser, }) => {
  return (
    <div className="p-4 border rounded-xl h-full flex flex-col">
      <ChatAreaHeader selectedUser={selectedUser} />
      <div className="flex-1">
        <Message loggedInUser={loggedInUser} selectedUser={selectedUser} />
      </div>
    </div>
  );
};

export default ChatSectionArea;
