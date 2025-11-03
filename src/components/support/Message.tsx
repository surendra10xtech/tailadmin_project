import React from "react";
import Image from "next/image";
import { Smile, Paperclip, Mic, Send } from "lucide-react"; // ✅ icons imported
import image from "../../data/photo.png";

const Message = () => {
  return (
    <div className="m-2 w-full flex flex-col gap-4">
      {/* Message Receiver */}
      <div className="flex items-end gap-3 max-w-[70%]">
        <Image
          src={image}
          alt="Profile photo"
          width={40}
          height={40}
          className="rounded-full"
        />
        <div>
          <p className="bg-gray-300 text-sm p-2 rounded-lg">
            I want to make an appointment tomorrow from 2:00 to 5:00
          </p>
          <span className="text-xs text-gray-500">2 hours ago</span>
        </div>
      </div>

      {/* Message Sender */}
      <div className="flex items-end gap-3 self-end max-w-[70%]">
        <div className="text-right">
          <p className="bg-blue-500 text-white text-sm p-2 rounded-lg">
            Sure, that time works perfectly!
          </p>
          <span className="text-xs text-gray-500">Just now</span>
        </div>
        <Image
          src={image}
          alt="Profile photo"
          width={40}
          height={40}
          className="rounded-full"
        />
      </div>


      {/* Message Receiver */}
      <div className="flex items-end gap-3 max-w-[70%]">
        <Image
          src={image}
          alt="Profile photo"
          width={40}
          height={40}
          className="rounded-full"
        />
        <div>
          <p className="bg-gray-300 text-sm p-2 rounded-lg">
            I want to make an appointment tomorrow from 2:00 to 5:00
          </p>
          <span className="text-xs text-gray-500">2 hours ago</span>
        </div>
      </div>


      {/* Message Sender */}
      <div className="flex items-end gap-3 self-end max-w-[70%]">
        <div className="text-right">
          <p className="bg-blue-500 text-white text-sm p-2 rounded-lg">
            Sure, that time works perfectly!
          </p>
          <span className="text-xs text-gray-500">Just now</span>
        </div>
        <Image
          src={image}
          alt="Profile photo"
          width={40}
          height={40}
          className="rounded-full"
        />
      </div>

      {/* Message Input Box */}
      <div className="flex items-center gap-3 mt-4 p-2 border-t border-gray-300 bg-white rounded-lg">
        {/* Emoji icon */}
        <button className="text-gray-600 hover:text-yellow-500">
          <Smile size={22} />
        </button>

       

        {/* Input box */}
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm outline-none"
        />

         {/* File  */}
        <label className="cursor-pointer text-gray-600 hover:text-blue-600">
          <Paperclip size={22} />
          <input type="file" className="hidden" />
        </label>

        {/* Mic  */}
        <button className="text-gray-600 hover:text-red-500">
          <Mic size={22} />
        </button>

        {/* Send  */}
        <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2">
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default Message;
