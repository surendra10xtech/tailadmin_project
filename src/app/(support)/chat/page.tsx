"use client";

import React from "react";
import AppHeader from "@/layout/AppHeader";
import AppSidebar from "@/layout/AppSidebar";
import ChatSectionSideBar from "@/components/support/ChatSectionSideBar";
import ChatSectionArea from "@/components/support/ChatSectionArea";

const Page = () => {
  return (
    <div className="flex min-h-screen">
      <div className="w-[22%] h-screen sticky top-0">
        <AppSidebar />
      </div>

      <div className="flex-1 bg-white flex flex-col h-screen">
        <AppHeader />
        <div className="p-4 text-black font-bold text-2xl">Chat</div>

        {/* Chat */}
        <div className="flex flex-1 overflow-hidden px-4 pb-4">
          {/* Left user list */}
          <div className="w-[25%] h-full">
            <ChatSectionSideBar />
          </div>

          {/*  chat area */}
          <div className="flex-1 h-full">
            <ChatSectionArea />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
