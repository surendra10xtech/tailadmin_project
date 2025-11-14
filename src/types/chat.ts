
import { User } from "@/types/user";
import { MessageType } from "@/types/message"; 


export interface ChatSectionSideBarProps {
  users: User[];
  selectedUserId: number;
  onSelectUser: (user: User) => void;
}

export interface ChatSectionAreaProps {
  selectedUser: User;
  loggedInUser: User;
}

export interface ChatAreaHeaderProps {
  selectedUser: User;
}

export interface MessageProps { 
   loggedInUser: User;
  selectedUser: User;
  messages?: MessageType[];
  sendMessage?: (msg: MessageType) => void;
}

// interface MessageProps {
//   loggedInUser: { id: number; name: string; role: string; image: string };
//   selectedUser: { id: number; name: string; role: string; image: string };
// }