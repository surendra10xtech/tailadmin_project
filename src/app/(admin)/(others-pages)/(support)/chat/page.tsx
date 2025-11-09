"use client";

import React, { useState } from "react";
import ChatSectionSideBar from "@/components/support/ChatSectionSideBar";
import ChatSectionArea from "@/components/support/ChatSectionArea";



const Page = () => {
  const ChatUsers = [
    { id: 1, name: "Surendra Pratap", role: "Technician", image: "/images/user/user-01.jpg" }, // image fetch from public folder
    { id: 2, name: "Ramendra", role: "Designer", image: "/images/user/user-02.jpg" },
    { id: 3, name: "Raghvendra", role: "Developer", image: "/images/user/user-03.jpg" },
    { id: 4, name: "Mahendra", role: "Advocate", image: "/images/user/user-04.jpg" },
    { id: 5, name: "Priya", role: "Manager", image: "/images/user/user-05.jpg" },
    { id: 6, name: "Pooja", role: "Support", image: "/images/user/user-06.jpg" },
    { id: 7, name: "Virat", role: "Batsman", image: "/images/user/user-07.jpg" },
    { id: 8, name: "Rohit", role: "Captain", image: "/images/user/user-08.jpg" },
  ];

  const [loggedInUser, setLoggedInUser] = useState(ChatUsers[0]);
  const [selectedUser, setSelectedUser] = useState(ChatUsers[1]);

  return (
    <div className="flex flex-col h-[100vh] bg-gray-50 overflow-hidden">
     
      <div className="p-3 border-b bg-white flex items-center gap-3 flex-shrink-0">
        <label className="font-semibold text-sm">Logged in user:</label>
        <select
          value={loggedInUser.id}
          onChange={(e) => {
            const user = ChatUsers.find(
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
            users={ChatUsers.filter((u) => u.id !== loggedInUser.id)}
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
