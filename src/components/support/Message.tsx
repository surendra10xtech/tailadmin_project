"use client";
import React, { useState, useEffect, useRef } from "react"; // 👈 useRef aur useEffect import karo
import Image from "next/image";
import { Smile, Paperclip, Send } from "lucide-react";
import pic from "../../data/photo.png";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import VoiceRecorder from "./VoiceRecorder";

type MessageType = {
  from: number;
  to: number;
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
    { from: 1, to: 2, text: "Hello jiiiiiiiii, Good morning" },
    { from: 2, to: 1, text: "Hello! How are you?" },
  ]);

  const [input, setInput] = useState("");
  const [file, setFile] = useState<string | null>(null);
  const [showEmoji, setShowEmoji] = useState(false);

    const messageEndRef = useRef<HTMLDivElement | null>(null);

  // ✅ Filter messages for selected user
   const filteredMessages = messages.filter(
    (msg) =>
      (msg.from === loggedInUser.id && msg.to === selectedUser.id) ||
      (msg.from === selectedUser.id && msg.to === loggedInUser.id)
  );

   useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [filteredMessages]);

  const handleSend = () => {
    if (!input.trim() && !file) return;

     const newMessage: MessageType = {
      from: loggedInUser.id,
      to: selectedUser.id,
      text: input,
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
  };

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setInput((prev) => prev + emojiData.emoji);
    setShowEmoji(false);
  };

  return (
    <div className="m-2 w-full flex flex-col gap-4 relative h-screen">
      {/* Message area */}
      <div className="flex flex-col gap-4 overflow-y-auto flex-1">
        {filteredMessages.map((msg, i) => (
          <div
            key={i}
            className={`flex items-end gap-3 ${
              msg.from === loggedInUser.id ? "self-end flex-row-reverse" : ""
            }`}
          >
            <Image
              src={pic}
              alt="Profile"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div
              className={`p-2 rounded-lg text-sm ${
                msg.from === loggedInUser.id
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
              { from: loggedInUser.id, 
                to: selectedUser.id,
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
        <div className="absolute bottom-14 left-[50%] z-10">
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}
    </div>
  );
};

export default Message;
