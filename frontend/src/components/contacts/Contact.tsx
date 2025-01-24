import { UserIcon } from "../ui/UserIcon";

interface User {
  username: string;
}

export function Contact({
  user,
  selectedUser,
  setSelectedUser,
}: {
  user: User;
  selectedUser: User | null; // Allow null here
  setSelectedUser: (user: User) => void;
}) {
  return (
    <div
      className={`flex gap-5 items-center px-3 py-3 cursor-pointer hover:bg-green-300 rounded-xl ${
        selectedUser?.username === user.username ? "bg-green-300" : ""
      }`}
      onClick={() => setSelectedUser(user)}
    >
      <div className="w-10 h-10 rounded-full bg-gray-200 flex justify-center items-center">
        <UserIcon />
      </div>
      <span className="text-xl font-semibold">{user.username}</span>
    </div>
  );
}
