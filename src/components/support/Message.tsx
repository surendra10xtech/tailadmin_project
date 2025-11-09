"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Smile, Paperclip, Send } from "lucide-react";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import VoiceRecorder from "./VoiceRecorder";

type MessageType = {
  sender: number;
  receiver: number;
  text?: string;
  image?: string;
  audio?: string;
};

interface MessageProps {
  loggedInUser: { id: number; name: string; role: string; image: string };
  selectedUser: { id: number; name: string; role: string; image: string };
}
const Message: React.FC<MessageProps> = ({ loggedInUser, selectedUser }) => {
  const [messages, setMessages] = useState<MessageType[]>([
    { sender: 1, receiver: 2, text: "Hello jiiiiiiiii, Good morning" },
    { sender: 2, receiver: 1, text: "Hello! How are you?" },
  ]);

  const [input, setInput] = useState("");
  const [file, setFile] = useState<string | null>(null);
  const [showEmoji, setShowEmoji] = useState(false);

    const messageEndRef = useRef<HTMLDivElement | null>(null);

  //  Filter messages for selected user
   const filteredMessages = messages.filter(
    (msg) =>
      (msg.sender === loggedInUser.id && msg.receiver === selectedUser.id) ||
      (msg.sender === selectedUser.id && msg.receiver === loggedInUser.id)
  );

   useEffect(() => {
  const timer = setTimeout(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, 3000);

  return () => clearTimeout(timer); 
}, [filteredMessages]);


  const handleSend = () => {
    if (!input.trim() && !file) return;
      const isImageURL = input.startsWith("blob:");


     const newMessage: MessageType = {
      sender: loggedInUser.id,
      receiver: selectedUser.id,
      text: isImageURL ? undefined : input,
      image: file || undefined,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setFile(null);
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    const imageURL = URL.createObjectURL(selectedFile);
    setFile(imageURL);
    setInput(imageURL);
  };

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setInput((prev) => prev + emojiData.emoji);
    setShowEmoji(false);
  };

  return (
    <div className="m-2 w-full flex flex-col gap-4 relative h-screen">
      {/* Message area */}
      <div className="flex flex-col gap-4 overflow-y-auto flex-1 max-h-[70vh]">
        {filteredMessages.map((msg, i) => (
          <div
            key={i}
            className={`flex items-end gap-3 ${
              msg.sender === loggedInUser.id ? "self-end flex-row-reverse" : ""
            }`}
          >
            <Image
              src={msg.sender === loggedInUser.id ? loggedInUser.image : selectedUser.image}
              alt="Profile"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div
              className={`p-2 rounded-lg text-sm ${
                msg.sender === loggedInUser.id
                  ? "bg-blue-500 text-white rounded-br-none"
                  : "bg-gray-300 text-black rounded-bl-none"
              }`}
            >
              {msg.text && <p>{msg.text}</p>}
              {msg.image && (
                <Image
                  src={msg.image}
                  alt="Uploaded"
                  width={150}
                  height={150}
                  className="rounded-lg mt-2"
                />
              )}
              {msg.audio && (
                <audio controls src={msg.audio} className="mt-2 rounded-lg" />
              )}
            </div>
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>

      {/* Input area */}
      <div className="flex items-center gap-3 mt-4 p-2 border-t border-gray-300 bg-white rounded-lg">
        <button
          onClick={() => setShowEmoji(!showEmoji)}
          className="text-gray-600 hover:text-yellow-500"
        >
          <Smile size={22} />
        </button>

        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
         if (e.key === "Enter" && !e.shiftKey) {
         e.preventDefault(); 
         handleSend(); 
          }
       }}
          className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm outline-none"
        />

        <label className="cursor-pointer text-gray-600 hover:text-blue-600">
          <Paperclip size={22} />
          <input
            onChange={handleFile}
            type="file"
            className="hidden"
            accept="image/*"
          />
        </label>

        <VoiceRecorder
          onRecordComplete={(audioURL) =>
            setMessages((prev) => [
              ...prev,
              { sender: loggedInUser.id, 
                receiver: selectedUser.id,
                audio: audioURL, },
            ])
          }
        />

        <button
          onClick={handleSend}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2"
        >
          <Send size={20} />
        </button>
      </div>

      {showEmoji && (
        <div className="absolute bottom-[25%] left-[0%] z-10">
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}
    </div>
  );
};

export default Message;
