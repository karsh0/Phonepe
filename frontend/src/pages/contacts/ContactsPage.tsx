import { useEffect, useState } from "react";
import { Logo } from "../../components/Logo";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { ChatBox } from "../../components/chats/ChatBox";
import { Contact } from "../../components/contacts/Contact";
import { useSocket } from "../../hooks/socket";

export interface User {
  username: string;
  userId: string;
  accountId: string;
}


export function ContactPage() {
  const [user, setUser] = useState<User | null>(null);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const ws = useSocket();

  useEffect(() => {
    axios
      .get<any>(`${BACKEND_URL}/user/dashboard`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setUser({
          userId: response.data.user.userId._id,
          username: response.data.user.userId.username,
          accountId: response.data.user._id, 
        });
      })
      .catch((error) => console.error("Error fetching current user:", error));
  }, []);

  useEffect(() => {
    if (!user) return;

    axios
      .get<any>(`${BACKEND_URL}/user/bulk`)
      .then((response) => {
        const filteredUsers = response.data.users.filter(
          (u: any) => u.user.userId.username !== user.username
        ).filter((value: any, index: any, self: any) => 
          index === self.findIndex((t: any) => t.user.userId.username === value.user.userId.username) 
        );
        console.log(filteredUsers);
        setAllUsers(filteredUsers);
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, [user]);

  return (
    <div className="w-screen h-screen px-10 py-5 flex flex-col gap-4">
      <Logo />
      <div className="w-full h-full flex justify-between">
        <div className="w-80 h-full flex flex-col px-5 py-5 rounded-2xl gap-4 bg-gray-50">
          <span className="text-3xl font-semibold">Contacts</span>
          <div className="flex flex-col">
            {allUsers.map((contact, index) => (
              <Contact
                key={contact.userId || index}
                selectedUser={selectedUser}
                setSelectedUser={setSelectedUser}
                data={contact}
                ws={ws} // WebSocket
              />
            ))}
          </div>
        </div>
        <ChatBox selectedUser={selectedUser} ws={ws} />
      </div>
    </div>
  );
}
