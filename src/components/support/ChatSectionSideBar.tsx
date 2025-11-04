"use client";
import React, { useState } from "react";

const ChatName = [
  { name: "Kaiya George", role: "Technician", image: "" },
  { name: "Zain", role: "Designer", image: "" },
  { name: "Surendra", role: "Developer", image: "" },
  { name: "Mahendra", role: "Advocate", image: "" },
  { name: "Riya", role: "Manager", image: "" },
  { name: "Aarav", role: "Support", image: "" },
];

const ChatSectionSideBar = () => {
  const [search, setSearch] = useState("");

  const filteredUsers = ChatName.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 border rounded-xl bg-white shadow-sm w-full max-w-xs  h-[500px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Chat</h3>
        <span className="text-gray-500">⋮</span>
      </div>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* User List */}
      <div className="space-y-3">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user, index) => (
            <div
              key={`${user.name}-${index}`}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition"
            >
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 font-semibold">
                {user.name.charAt(0)}
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-800">
                  {user.name}
                </h4>
                <p className="text-xs text-gray-500">{user.role}</p>
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
