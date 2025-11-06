"use client";
import React from "react";
import Image from "next/image";
import defaultImage  from "../../data/photo.png";


type User = {
  name: string;
  role: string;
  image: string;
};




interface ChatAreaHeaderProps {
  selectedUser: User;
}
const ChatAreaHeader: React.FC<ChatAreaHeaderProps> = ({ selectedUser }) => {
  return (
    <div className="w-full flex border-b-gray-600 border-b-2  items-center justify-between px-6 py-3">
      {/* Left section  */}
      <div className="flex items-center gap-3 flex-shrink-0">
        <Image
          src={selectedUser?.image || defaultImage}
          alt="Profile photo"
          width={45}
          height={45}
          className="rounded-full"
        />
        <div className="flex flex-col">
          <p className="font-semibold text-gray-800 text-sm leading-tight">{selectedUser?.name}</p>
          <p className="text-xs text-green-500">Online</p>
        </div>
      </div>

      {/* Right section  */}
      <div className="flex items-center gap-6 text-gray-600 text-lg flex-shrink-0 ml-auto">
        <button className="hover:text-blue-600 transition">📞</button>
        <button className="hover:text-blue-600 transition">🎥</button>
        <button className="hover:text-blue-600 transition">⋮</button>
      </div>
    </div>
  );
};

export default ChatAreaHeader;
