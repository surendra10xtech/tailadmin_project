import React, { useState } from "react";
import Image from "next/image";
import { Smile, Paperclip, Send } from "lucide-react";
import pic from "../../data/photo.png";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import VoiceRecorder from "./VoiceRecorder";


type Message = {
  sender: string;   // always required
  text?: string;    // optional because not every message has text
  image?: string;   // optional because only image messages have it
  audio?: string;   // optional because only audio messages have it
};
const Message = () => {
const [messages, setMessages] = useState<Message[]>([
      {text:"Hello jiiiiiiiii, Good monring",sender:"other",image:""},
      {text:"Good Morning! How Are you today??",sender:"me",image:""},
      {text:"EveryThing okay ",sender:"other",image:""},
      {text:"ohhh nice ",sender:"me",image:""},
  ]);

  const [input,setInput] = useState("");
  const [file, setFile] = useState<string | null>(null);
  const [isTyping,setIsTyping] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);


  const handleSend = () =>{
    if(!input.trim() && !file) return;

    let newMessage;
    if(file){
      newMessage =  { image: file, sender: "me" };
    }
    else{
       newMessage = { text: input, sender: "me" };
    }
    // const newMessage = {text:input,sender:"me"};
    setMessages((prev) => [...prev, newMessage]); // i dont known why red line appear
    setInput("");
    console.log(messages);
    setFile(null);

    setTimeout(() =>{
      setIsTyping(true);
    },3000);

    setTimeout(() =>{
      setIsTyping(false);
      handleReply();
    },10000);
  };

  const handleReply = () => {
    const autoReplies = [
      "That's interesting!",
      "Tell me more about it.",
      "Really? Sounds cool!",
      "I totally agree with you!",
      "Haha, nice one!",
      "Can you explain that again?",
    ];

    const randomReply = autoReplies[Math.floor(Math.random()*autoReplies.length)];
    const newMessage = { text: randomReply, sender: "other", image: "" };
    setMessages((prev) =>[...prev,newMessage]);
  }

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if(!selectedFile) return;

    const imageURL = URL.createObjectURL(selectedFile);
    setInput((prev)=> prev + imageURL);
    setFile(imageURL);
 
  };

 const handleEmojiClick = (emojiData: EmojiClickData) => {
    setInput((prev) =>  prev + emojiData.emoji);
    setShowEmoji(false);
  }

  return (
    <div className="m-2 w-full flex flex-col gap-4">
        <div className="flex flex-col gap-4 overflow-y-auto max-h-[70vh]">
        {messages.map((msg,i)=>(
          <div
          key={i}
           className={`flex items-end gap-3 ${
              msg.sender === "me" ? "self-end flex-row-reverse" : ""
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
                msg.sender === "me"
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
              <audio
              controls
              src={msg.audio}
              className="mt-2 rounded-lg"
            ></audio>
          )}
              
            </div>
          </div>
        ))}

          {isTyping && (
          <div className="flex items-center gap-3">
            <Image
              src={pic}
              alt="Profile"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div className="bg-green-300 text-black px-3 py-2 rounded-lg rounded-bl-none text-sm">
              <span className="flex gap-1">
                <span className="animate-bounce">●</span>
                <span className="animate-bounce delay-150">●</span>
                <span className="animate-bounce delay-300">●</span>
              </span>
            </div>
          </div>
          )}

      </div>

      {/* Message Input Box */}
      <div className="flex items-center gap-3 mt-4 p-2 border-t border-gray-300 bg-white rounded-lg">
        {/* Emoji icon */}
        <button onClick={() => setShowEmoji(!showEmoji)}
        className="text-gray-600 hover:text-yellow-500">
          <Smile size={22} />
        </button>

       

        {/* Input box */}
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm outline-none"
        />

         {/* File  */}
        <label className="cursor-pointer text-gray-600 hover:text-blue-600">
          <Paperclip size={22} />
          <input onChange={handleFile}
          type="file" 
          className="hidden" 
          accept="image/*"
          />
        </label>

        {/* Mic Recorder Component */}
      <VoiceRecorder
          onRecordComplete={(audioURL) => {
           setMessages((prev) => [...prev, { audio: audioURL, sender: "me" },]); // here also 
              }}
              />

        {/* Send  */}
        <button onClick={handleSend}
        className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2">
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
