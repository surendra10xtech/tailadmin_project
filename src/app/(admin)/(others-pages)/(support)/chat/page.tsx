"use client";

import React from "react";
// import AppHeader from "@/layout/AppHeader";
// import AppSidebar from "@/layout/AppSidebar";
import ChatSectionSideBar from "@/components/support/ChatSectionSideBar";
import ChatSectionArea from "@/components/support/ChatSectionArea";

const Page = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
    
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen">

        {/* Page Title */}
        <div className=" text-black font-semibold text-xl">
          Chat
        </div>

        {/* Chat Area */}
        <div className="flex flex-1 gap-5 px-6 py-4 overflow-hidden">
          {/*  User List */}
          <div className="w-[30%] h-full bg-white rounded-xl shadow-sm border overflow-y-auto">
            
            <ChatSectionSideBar />
          </div>

          {/* message area */}
          <div className="flex-1 h-full bg-white rounded-xl shadow-sm border overflow-y-auto">
            <ChatSectionArea />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
