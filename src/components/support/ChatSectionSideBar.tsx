"use client";

import React, { useState } from "react";
import Image from "next/image";
import { filterUsers } from "@/hooks/useChat";
import { ChatSectionSideBarProps } from "@/types/chat";
import SendTemplateButton from "@/components/SendTemplateButton";



const ChatSectionSideBar: React.FC<ChatSectionSideBarProps> = ({
  users,
  selectedUserId,
  onSelectUser,
}) => {
  const orderId = 12345;
  const [search, setSearch] = useState("");
  const filteredUsers = filterUsers(users, search);

  return (
    <div className="p-4 border bg-white shadow-sm w-full overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Chats</h3>
        <span className="text-gray-500 font-semibold">⋮</span>
      </div>

      {/* User Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-3 py-2 text-sm border border-gray-300 
          rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {/* User List */}
      <div className="space-y-3">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div
              key={user.id}
              onClick={() => onSelectUser(user)}
              className={`flex justify-center items-center gap-3 p-2 rounded-lg cursor-pointer transition ${
                selectedUserId === user.id
                  ? "bg-blue-100"
                  : "hover:bg-gray-100"
              }`}
            >
              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
  {user.image ? (
    <Image
  src={user.image}
  alt={user.name}
  width={40}      
  height={40}     
  className="object-cover rounded-full"
    />
  ) : (
    <div className="w-full h-full bg-gray-200 flex items-center justify-center
     text-gray-600 font-semibold">
      {user.name.charAt(0)}
    </div>
  )}
</div>
              <div>
                <h4 className="text-sm font-medium text-gray-800">
                  {user.name}
                </h4>
                <p className="text-xs text-gray-500">{user.role}</p>
              </div>
                <div className="bg-white rounded">
                 <SendTemplateButton 
                 templateName="order_update"
                 phoneNumber={user.ph}
                 params={[user.name, orderId]}
                 label="Send"
                /> 
                </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-400 text-center">No results found</p>
        )}
      </div>
    </div>
  );
};

export default ChatSectionSideBar;
