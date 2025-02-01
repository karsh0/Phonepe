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

interface ContactResponse {
  users: User[];
}
export function ContactPage() {
  const [user, setUser] = useState<User | null>(null);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [ws, setWs] = useState<WebSocket | null>(null);

  // Fetch users on mount
  useEffect(() => {
    axios
      .get<ContactResponse>(`${BACKEND_URL}/user/bulk`)
      .then((response) => setAllUsers(response.data.users))
      .catch((error) => console.error("Error fetching users:", error));

    axios
      .get<User>(`${BACKEND_URL}/user/dashboard`)
      .then((response) => setUser(response.data))
      .catch((error) => console.error("Error fetching current user:", error));
  }, []);

  // WebSocket Connection (Fixing Infinite Loop)
  const socket = useSocket();
  useEffect(() => {
    if (!ws) {
      setWs(socket);
    }
  }, [socket, ws]); // Run only when `socket` or `ws` changes

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
              />
            ))}
          </div>
        </div>
        <ChatBox selectedUser={selectedUser} ws={ws} />
      </div>
    </div>
  );
}
