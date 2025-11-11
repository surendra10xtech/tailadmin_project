
import { User } from "@/types/user";

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
}

// interface MessageProps {
//   loggedInUser: { id: number; name: string; role: string; image: string };
//   selectedUser: { id: number; name: string; role: string; image: string };
// }