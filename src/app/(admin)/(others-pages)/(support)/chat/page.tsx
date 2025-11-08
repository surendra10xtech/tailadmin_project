"use client";

import React, { useState } from "react";
import ChatSectionSideBar from "@/components/support/ChatSectionSideBar";
import ChatSectionArea from "@/components/support/ChatSectionArea";

const Page = () => {
  const ChatUsers = [
    { id: 1, name: "Kaiya George", role: "Technician", image: "" },
    { id: 2, name: "Zain", role: "Designer", image: "" },
    { id: 3, name: "Surendra", role: "Developer", image: "" },
    { id: 4, name: "Mahendra", role: "Advocate", image: "" },
    { id: 5, name: "Riya", role: "Manager", image: "" },
    { id: 6, name: "Aarav", role: "Support", image: "" },
  ];

  //  Logged-in user (default Kaiya)
  const [loggedInUser, setLoggedInUser] = useState(ChatUsers[0]);

  //  Chat section  ke liye selected user
  const [selectedUser, setSelectedUser] = useState(ChatUsers[1]);

  return (
    <div className="flex flex-col h-[90vh] bg-gray-50">

      {/*  Logged-in user switcher */}
      <div className="p-3 border-b bg-white flex items-center gap-3">
        <label className="font-semibold text-sm">Logged in as:</label>
        <select
          value={loggedInUser.id}
          onChange={(e) => {
            const user = ChatUsers.find(u => u.id === Number(e.target.value));
            if (user) setLoggedInUser(user);
          }}
          className="border px-2 py-1 rounded"
        >
          {ChatUsers.map(u => (
            <option key={u.id} value={u.id}>{u.name}</option>
          ))}
        </select>
      </div>

      {/* Chat layout */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-1/4 border-r">
          <ChatSectionSideBar
            users={ChatUsers.filter(u => u.id !== loggedInUser.id)} // logged -user not show in user sidebar list
            selectedUserId={selectedUser.id}
            onSelectUser={setSelectedUser}
          />
        </div>

        {/* Chat Area */}
        <div className="flex-1">
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
