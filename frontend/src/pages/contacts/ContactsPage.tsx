import { useEffect, useState } from "react";
import { Logo } from "../../components/Logo";
import axios, { all } from "axios";
import { BACKEND_URL } from "../../config";
import { ChatBox } from "../../components/chats/ChatBox";
import { Contact } from "../../components/contacts/Contact";

export interface User {
  username: string;
  userId: string;
  accountId: string
}

interface ContactResponse {
  users: User[];
}

export function ContactPage() {
  const [user, setUser] = useState<User | null>(null);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);


  useEffect(() => {
    axios
      .get<any>(`${BACKEND_URL}/user/bulk`)
      .then((response) => setAllUsers(response.data.users))
      .catch((error) => console.error("Error fetching users:", error));

    axios
      .get<User>(`${BACKEND_URL}/user/dashboard`)
      .then((response) => setUser(response.data))
      .catch((error) => console.error("Error fetching current user:", error));
  }, []);
  
  return (
    <div className="w-screen h-screen px-10 py-5 flex flex-col gap-4">
      <Logo />
      <div className="w-full h-full flex justify-between">
        <div className="w-80 h-full flex flex-col px-5 py-5 rounded-2xl gap-4 bg-gray-50">
          <span className="text-3xl font-semibold">Contacts</span>
          <div className="flex flex-col">
            {allUsers.map((user, index) => (
              <Contact
                key={user.userId || index}
                selectedUser={selectedUser}
                setSelectedUser={setSelectedUser}
                data={user}
              />
            ))}
          </div>
        </div>
        <ChatBox selectedUser={selectedUser} />
      </div>
    </div>
  );
}
