import React from "react";
import ChatAreaHeader from "./ChatAreaHeader";
import Message from "./Message";


type User = {
  name: string;
  role: string;
  image: string;
};

interface ChatSectionAreaProps {
  selectedUser: User;
}
const ChatSectionArea: React.FC<ChatSectionAreaProps> = ({ selectedUser }) => {
  return (
    <div className="p-4 border rounded-xl h-full flex flex-col ">
      <ChatAreaHeader  selectedUser = {selectedUser}/>
      <div className="flex-1 ">
        <Message />
      </div>
    </div>
  );
};

export default ChatSectionArea;
