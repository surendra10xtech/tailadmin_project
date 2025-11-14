import { useEffect, useState } from "react";
import { MessageType } from "@/types/message";
import { ChatUsers } from "@/data/ChatData"; // 👈 import users
import { User } from "@/types/user";

export const filterUsers = (users: any[], search: string) => {
  return users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );
};

export const useChat = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [users, setUsers] = useState<User[]>(ChatUsers); // 👈 add this line

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch("/api/messages");
        const data = await res.json();
        setUsers(data.users || []);
        setMessages(data);
      } catch (err) {
        console.error("Failed to fetch messages:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const sendMessage = async (msg: Omit<MessageType, "id" | "timestamp">) => {
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(msg),
      });

      const newMsg = await res.json();
      setMessages((prev) => [...prev, newMsg]);
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  return { users, messages, loading, sendMessage };
};
