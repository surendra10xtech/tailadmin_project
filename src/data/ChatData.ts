import { MessageType } from "@/types/message";

 export const ChatUsers = [
    { id: 1, name: "Surendra Pratap", role: "Technician", image: "/images/user/user-01.jpg" }, // image fetch from public folder
    { id: 2, name: "Ramendra", role: "Designer", image: "/images/user/user-02.jpg" },
    { id: 3, name: "Raghvendra", role: "Developer", image: "/images/user/user-03.jpg" },
    { id: 4, name: "Mahendra", role: "Advocate", image: "/images/user/user-04.jpg" },
    { id: 5, name: "Priya", role: "Manager", image: "/images/user/user-05.jpg" },
    { id: 6, name: "Pooja", role: "Support", image: "/images/user/user-06.jpg" },
    { id: 7, name: "Virat", role: "Batsman", image: "/images/user/user-07.jpg" },
    { id: 8, name: "Rohit", role: "Captain", image: "/images/user/user-08.jpg" },
    { id: 9, name: "Sumit Mishra", role: "Youtuber", image: "/images/user/user-09.jpg" },
    { id: 10, name: "Ansh Mishra", role: "Farmer", image: "/images/user/user-10.jpg" },
     
  ];


  export const initialMessages: MessageType[] = [
  { sender: 1, receiver: 2, text: "Hello jiiiiiiiii, Good morning" },
  { sender: 2, receiver: 1, text: "Hello! How are you?" },
];