"use client";
import React from "react";
import ChatAreaHeader from "./ChatAreaHeader";
import Message from "./Message";
import { ChatSectionAreaProps } from "@/types/chat";
import { useChat } from "@/hooks/useChat";




const ChatSectionArea: React.FC<ChatSectionAreaProps> = ({
  selectedUser,
  loggedInUser, }) => {

    const { messages, sendMessage} = useChat();

  return (
    <div className="p-4 border rounded-xl h-full flex flex-col">
      <ChatAreaHeader selectedUser={selectedUser} />
      <div className="flex-1">
 <Message
    loggedInUser={loggedInUser}
    selectedUser={selectedUser}
    messages={messages}
    sendMessage={sendMessage}
  />      </div>
    </div>
  );
};

export default ChatSectionArea;
