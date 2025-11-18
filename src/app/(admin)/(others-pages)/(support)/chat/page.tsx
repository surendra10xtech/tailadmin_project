"use client";

import React, { useEffect, useState } from "react";
import { ChatUsers } from "@/data/ChatData";
import ChatSectionSideBar from "@/components/support/ChatSectionSideBar";
import ChatSectionArea from "@/components/support/ChatSectionArea";
import { useChat } from "@/hooks/useChat";
import { User } from "@/types/user";

const Page = () => {
  const { users, loading } = useChat();
 const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  useEffect(() => {
    if (!loading && users.length) {
      setLoggedInUser(prev => prev ?? users[0]);
      setSelectedUser(prev => prev ?? users[1] ?? users[0]);
    }
  }, [loading, users]);
  
   if (!loggedInUser || !selectedUser) return <div>Loading...</div>;


  return (
    <div className="flex flex-col h-[100vh] bg-gray-50 overflow-hidden">
     
      <div className="p-3 border-b bg-white flex items-center gap-3 flex-shrink-0">
        <label className="font-semibold text-sm">Logged in user:</label>
        <select
          value={loggedInUser.id}
          onChange={(e) => {
            const user = users.find(
              (u) => u.id === Number(e.target.value)
            );
            if (user) setLoggedInUser(user);
          }}
          className="border px-2 py-1 rounded"
        >
          {ChatUsers.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name}
            </option>
          ))}
        </select>
      </div>

      {/* Main Chat Layout */}
      <div className="flex flex-1 overflow-hidden">
      
        <div className="w-1/4 border-r overflow-y-auto">
          <ChatSectionSideBar
            users={users.filter((u) => u.id !== loggedInUser.id)}
            selectedUserId={selectedUser.id}
            onSelectUser={setSelectedUser}
          />
        </div>

        
        <div className="flex-1 overflow-y-auto">
          <ChatSectionArea
            loggedInUser={loggedInUser}
            selectedUser={selectedUser}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
